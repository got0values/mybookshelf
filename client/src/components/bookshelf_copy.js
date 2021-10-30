import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Welcome from "./welcome.js"
import Pagination from './pagination.js';

const Bookshelf = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [originalBooks, setOriginalBooks] = useState([]); //keeps original state for search and filter

  //gets auth0 userID then sets variable to owner
  let {isAuthenticated, user} = useAuth0();
  const [owner, setOwner] = useState("");

  //connect to mongodb to get all current record data then set to record state
  useEffect(()=>{
    const fetchBooks = async () => {
        if(isAuthenticated){
        setOwner(user.sub);
        }
        try {
            setLoading(true);
            axios
                .get(props.server + "/book/", {
                headers: {
                    reqowner: owner
                }
            })
            .then((response) => {
            setBooks(response.data);
            setOriginalBooks(response.data);
            setLoading(false);
            })
        } catch(error) {
        console.log(error);
        }
    }
    fetchBooks();
  },[isAuthenticated, user, owner]);

  // This method will delete a book based on the method
  const deleteBook = (id) => {
    axios.delete(props.server + "/" + id).then((response) => {
      console.log(response.data);
    });
    setBooks(books.filter((el) => el._id !== id));
  }

    //defines a single book in the bookList map method
    const Book = (props) => {

        //gets book thumbnail
        const [bookurl, setBookurl] = useState("");
        const getThumb = async (isbn) => {
            if (isbn !== "") {
                try {
                    await axios
                    .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
                    .then((response) => {
                    if (response.data.items !== undefined) {
                        setBookurl(response.data.items[0].volumeInfo.imageLinks.thumbnail)
                        };
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            else {
                setBookurl("https://via.placeholder.com/128x195");
            }
        }
        useEffect(()=>{
            getThumb(props.book.book_ISBN);
        },[props.book.book_ISBN])
        
        return (
            <div className="card shadow m-3" style={{width: "14rem"}}>
                <Link to={"/view/" + props.book._id}>
                    <img className="card-img-top pt-1 px-5" src={bookurl} alt="bookimg"/>
                </Link>
                <div className="card-body">
                    <div className="card-title">{props.book.book_title}</div>
                    <div className="card-text">{props.book.book_author}</div>
                    <div className="card-text">{props.book.book_rating}</div>
                    <div className="card-text mt-auto">
                        <Link to={"/view/" + props.book._id} className="btn btn-success shadow mr-1">View</Link>
                        <a
                        href="/"
                        onClick={() => {
                            props.deleteBook(props.book._id);
                        }}
                        className="btn btn-danger shadow ml-1"
                        >
                        Delete
                        </a>
                    </div>
                </div>
            </div>
        )
    }

  //pagination display variables to get number of books to map
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  //paginate change page function
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const Bookshelf = () => {
    return currentBooks.map((currentbook) => {
      return (
        <Book
          book={currentbook}
          deleteBook={deleteBook}
          key={currentbook._id}
        />
      );
    });
  }

    const [searchTerm, setSearchTerm] = useState(''); //for input text value
    const handleSearch = (e) => {
        setSearchTerm(e.target.value); //for input text value
        //e.target.value is used because if useState searchTerm is used, it will be delayed
        let searchedBooks = books.filter((book)=>book.book_title.toLowerCase().includes(e.target.value.toLowerCase()));
        //set books to origial state (all) if input text is blank
        if (e.target.value !== '') {
            setBooks(searchedBooks);
        }
        else {
            setBooks(originalBooks);
        }
    }
    const [ratingFilter, setRatingFilter] = useState('');
    const filterRating = (e) => {
        setRatingFilter(e.target.value);
        const ratingFilterResults = originalBooks.filter((book)=>book.book_rating === e.target.value);
        setBooks(originalBooks);
        if (e.target.value !== '') {
            setBooks(ratingFilterResults);
        }
        else {
            setBooks(originalBooks);
        }
    }
    
    const FilterControls = () => {
        return (
            <div className="row border justify-content-center align-items-center p-2">

                <label for="search">Search:&nbsp;</label>
                <input autoFocus="autoFocus" type="text" value={searchTerm} onChange={handleSearch}/>&nbsp;
                <label for="filterrating">Rating:&nbsp;</label>
                <select id="filterrating" value={ratingFilter} onChange={filterRating}>
                    <option value="">All</option>
                    <option value="Bad">Bad</option>
                    <option value="OK">OK</option>
                    <option value="Great">Great</option>
                </select>

            </div>
        )
    }

  const BookShelfList = () => {
    return (
        <div>
            <div className="mt-4 pl-2 pr-2">
                <h3 className="d-flex flex-row align-items-center justify-content-center bg-white mt-3">Bookshelf</h3>
                <FilterControls/>
                <div className="row justify-content-center mt-3">
                    {!loading ? Bookshelf() : "Loading..."}
                </div>
            </div>
            <Pagination 
                booksPerPage={booksPerPage} 
                totalBooks={books.length} 
                goToPage={goToPage} 
            />
        </div>
    )
  }

  return (
    <div className="container w-75 fixed-right">
      {isAuthenticated ? <BookShelfList/> : (
        <Welcome/>
      )}
    </div>
  );

}

export default Bookshelf;
import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from './pagination.js';

const Bookshelf = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

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
            setLoading(false);
            })
        } catch(error) {
        console.log(error);
        }
    }
    fetchBooks();
  },[isAuthenticated, user, owner, props.server]);

  // This method will delete a book based on the method
  const deleteBook = (id) => {
    axios.delete(props.server + "/" + id).then((response) => {
      console.log(response.data);
    });
    setBooks(books.filter((el) => el._id !== id));
  }

  //defines a single book in the bookList map method
  const Book = (props) => (
    <tr className="flex-row align-items-center justify-content-center">
      <td>{props.book.book_title}</td>
      <td>{props.book.book_author}</td>
      <td>{props.book.book_ISBN}</td>
      <td>{props.book.book_rating}</td>
      <td>
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
      </td>
    </tr>
  );

  //pagination display variables to get number of books to map
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  //paginate change page function
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const bookshelf = () => {
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

  const Welcome = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-3">
        <h1>Welcome!</h1>
        <p>Log In on the left to continue</p>
      </div>
    )
  }

  const BookShelfList = () => {
    return (
        <div>
            <div className="mt-4 card shadow pl-2 pr-2" style={{height: '85vh'}}>
                <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Bookshelf</h3>
                <div className="table-responsive">
                <table className="card-body table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{!loading ? bookshelf() : "Loading..."}</tbody>
                </table>
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
    <div className="container-sm w-75 fixed-right">
      {isAuthenticated ? <BookShelfList/> : (
        <Welcome/>
      )}
    </div>
  );

}

export default Bookshelf;
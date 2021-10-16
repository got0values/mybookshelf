import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Bookshelf = (props) => {
  const [books, setBooks] = useState([]);

  //connect to mongodb to get all current record data then set to record state
  useEffect(()=>{
    try {
      axios
        .get("http://localhost:5000/book/")
        .then((response) => {
          setBooks(response.data);
        })
    } catch(error) {
      console.log(error);
    }
  },[]);

  // This method will delete a record based on the method
  const deleteBook = (id) => {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });
    setBooks(books.filter((el) => el._id !== id));
  }

  //defines a single record in the recordList map method
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

  const bookshelf = () => {
    return books.map((currentbook) => {
      return (
        <Book
          book={currentbook}
          deleteBook={deleteBook}
          key={currentbook._id}
        />
      );
    });
  }

  return (
    <div className="container mt-4 card shadow mb-4">
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Bookshelf</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{bookshelf()}</tbody>
      </table>
    </div>
  );

}

export default Bookshelf;
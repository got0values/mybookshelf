import { useState, useEffect } from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
// This will require to npm install axios
import axios from 'axios';

import { useAuth0 } from "@auth0/auth0-react";

const AddListBook = (props) => {
  //if authenticated, set the user to userID(user.sub)
  const {isAuthenticated, user} = useAuth0();
  const [owner, setOwner] = useState("");
  useEffect(()=>{
    if(isAuthenticated){
      setOwner(user.sub);
    }
  },[isAuthenticated, user])

  const [book, setBook] = useState({
    bookISBN: "",
    bookThumbURL: "",
    bookDescription: "",
    bookTitle: "",
    bookAuthor: "",
    bookRating: "",
    bookNotes: ""
  });

  const onChangeBookISBN = (e) => {
    setBook({
      ...book, 
      bookISBN: e.target.value
    });
  }

  const onChangeBookTitle = (e) => {
    setBook({
      ...book, 
      bookTitle: e.target.value
    });
  }

  const onChangeBookAuthor = (e) => {
    setBook({
      ...book, 
      bookAuthor: e.target.value
    });
  }

  const onChangeBookRating = (e) => {
    setBook({
      ...book, 
      bookRating: e.target.value
    });
  }

  const onChangeBookNotes = (e) => {
    setBook({
      ...book, 
      bookNotes: e.target.value
    });
  }

    //get list to be added to info
    const location = useLocation();
    const listID = location.state.listID;
    const listName = location.state.listName;

    const history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();
        const newListBook = {
        book_ISBN: book.bookISBN,
        book_title: book.bookTitle,
        book_author: book.bookAuthor,
        book_rating: book.bookRating,
        book_notes: book.bookNotes,
        list_ID: listID,
        added_by_ID: owner
        }
        axios
        .post(props.server + "/list/addbook", newListBook)
        .then((res) => console.log(res.data));
    
        setBook({
        bookISBN: "",
        bookTitle: "",
        bookAuthor: "",
        bookRating: "",
        bookNotes: ""
        })

        history.push('/viewlist/' + listID);
    }

  return (
    <div className="container mt-4 card shadow mb-4">
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Add Book to {listName} List</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>ISBN (for book info and thumbnail): </label>
          <input
            type="text"
            className="form-control"
            value={book.bookISBN}
            onChange={onChangeBookISBN}
          />
        </div>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            className="form-control"
            value={book.bookTitle}
            onChange={onChangeBookTitle}
          />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input
            type="text"
            className="form-control"
            value={book.bookAuthor}
            onChange={onChangeBookAuthor}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Bad"
              checked={book.bookRating === "Bad"}
              onChange={onChangeBookRating}
            />
            <label className="form-check-label">Bad</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="OK"
              checked={book.bookRating === "OK"}
              onChange={onChangeBookRating}
            />
            <label className="form-check-label">Good</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Great"
              checked={book.bookRating === "Great"}
              onChange={onChangeBookRating}
            />
            <label className="form-check-label">Great</label>
          </div>
        </div>
        <div className="form-group">
          <label>Notes: </label>
          <textarea
            type="text"
            className="form-control"
            value={book.bookNotes}
            onChange={onChangeBookNotes}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Add Book"
            className="btn btn-success"
          />
        </div>
      </form>
      <div>
          <Link to={`/viewlist/${listID}`}>Back</Link>
      </div>
    </div>
  );
}

export default AddListBook;
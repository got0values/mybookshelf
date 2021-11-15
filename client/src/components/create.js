import { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';

import { useAuth0 } from "@auth0/auth0-react";

const Create = (props) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      book_ISBN: book.bookISBN,
      book_title: book.bookTitle,
      book_author: book.bookAuthor,
      book_rating: book.bookRating,
      book_notes: book.bookNotes,
      owner: owner
    }
    axios
      .post(props.server + "/book/add", newBook)
      .then((res) => console.log(res.data));
 
    setBook({
      bookISBN: "",
      bookTitle: "",
      bookAuthor: "",
      bookRating: "",
      bookNotes: ""
    })
  }

  return (
    <div className="container w-75 fixed-right mt-4 card shadow my-3 mb-4">
      <div className="px-2 mt-3 pb-2">
        <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Add Book</h3>
        <form onSubmit={onSubmit}>
          <input type="hidden" value={owner}/> 
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
      </div>
    </div>
  );
}

export default Create;
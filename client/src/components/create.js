import { useState } from "react";
// This will require to npm install axios
import axios from 'axios';

const Create = (props) => {
  const [bookISBN, setBookISBN] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookRating, setBookRating] = useState("");
  const [bookNotes, setBookNotes] = useState("");

  const onChangeBookISBN = (e) => {
    setBookISBN(e.target.value);
  }

  const onChangeBookTitle = (e) => {
    setBookTitle(e.target.value);
  }

  const onChangeBookAuthor = (e) => {
    setBookAuthor(e.target.value);
  }

  const onChangeBookRating = (e) => {
    setBookRating(e.target.value);
  }

  const onChangeBookNotes = (e) => {
    setBookNotes(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      book_ISBN: bookISBN,
      book_title: bookTitle,
      book_author: bookAuthor,
      book_rating: bookRating,
      book_notes: bookNotes
    }
    axios
      .post("http://localhost:5000/book/add", newBook)
      .then((res) => console.log(res.data));
 
    setBookISBN("");
    setBookTitle("");
    setBookAuthor("");
    setBookRating("");
    setBookNotes("");
  }

  return (
    <div className="container mt-4 card shadow mb-4">
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Add Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>ISBN: </label>
          <input
            type="text"
            className="form-control"
            value={bookISBN}
            onChange={onChangeBookISBN}
          />
        </div>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            className="form-control"
            value={bookTitle}
            onChange={onChangeBookTitle}
          />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <input
            type="text"
            className="form-control"
            value={bookAuthor}
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
              checked={bookRating === "Bad"}
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
              checked={bookRating === "OK"}
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
              checked={bookRating === "Great"}
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
            value={bookNotes}
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
  );
}

export default Create;
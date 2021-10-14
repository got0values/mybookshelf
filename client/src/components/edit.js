import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams, useHistory } from "react-router-dom";

const Edit = (props) => {
  const [bookISBN, setBookISBN] = useState("");
  const [bookThumbURL, setBookThumbURL] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookRating, setBookRating] = useState("");
  const [bookNotes, setBookNotes] = useState("");

  let {id} = useParams(); //gets the url param
  let history = useHistory();

  useEffect(()=> {

    try {
      axios
      .get("http://localhost:5000/book/" + id)
      .then((response) => {
        setBookISBN(response.data.book_ISBN);
        setBookTitle(response.data.book_title);
        setBookAuthor(response.data.book_author);
        setBookRating(response.data.book_rating);
        setBookNotes(response.data.book_notes);
      })
    }catch(e) {
      console.log(e);
    }

    if (bookISBN !== "" || bookISBN !== null) {
      try {
        axios
        .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + bookISBN)
        .then((response) => {
          if (response.data.items !== undefined) {
            setBookThumbURL(response.data.items[0].volumeInfo.imageLinks.thumbnail);
            setBookDescription(response.data.items[0].volumeInfo.description);
          }
        })
      } catch (e) {
        console.log(e);
      }
    }
  }, [id, bookISBN, bookThumbURL])

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
    const newEditedBook = {
      book_ISBN: bookISBN,
      book_title: bookTitle,
      book_author: bookAuthor,
      book_rating: bookRating,
      book_notes: bookNotes
    }
    
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + id,
        newEditedBook
      )
      .then((res) => console.log(res.data));
 
    history.push("/view/" + id);
  }

  let BookThumb = () => {
    return (
        <>
            <img src={bookThumbURL} alt="bookthumb" className="float-left mr-3 mb-1"/>
        </>
    )
  }

  let BookDescription = () => {
    return (
        <>
            {bookDescription}
        </>
    )
  }

  let BookInfo = () => {
    return (
      <div className="row">
          <div className="col">
            <BookThumb/>
            <BookDescription/>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4 card shadow mb-4">
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Update Book: {bookTitle}</h3>
      {console.log(bookISBN)}
      {bookISBN !== "" ? <BookInfo/> : ""}
      <hr/>
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
            <label className="form-check-label">OK</label>
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
        <br />
        <div className="form-group d-flex justify-content-between">
          <Link to={`/view/${id}`}>Back</Link>
          <input
            type="submit"
            value="Update Book"
            className="btn btn-success"
          />
        </div>
      </form>

    </div>
  );
}
 
export default Edit;
import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams, useHistory } from "react-router-dom";

const Edit = (props) => {
  const [book, setBook] = useState({
    bookISBN: "",
    bookThumbURL: "",
    bookDescription: "",
    bookTitle: "",
    bookAuthor: "",
    bookRating: "",
    bookNotes: ""
  });

  let {id} = useParams(); //gets the url param
  let history = useHistory();

  const getBook = async () => {
    try {
      await axios
      .get("http://localhost:5000/book/" + id)
      .then((response) => {
        setBook({
          bookISBN: response.data.book_ISBN,
          bookTitle: response.data.book_title,
          bookAuthor: response.data.book_author,
          bookRating: response.data.book_rating,
          bookNotes: response.data.book_notes
        })
      })
    }catch(e) {
      console.log(e);
    }
  }

  const getThumb = async () => {
    if (book.bookISBN !== "") {
      try {
        await axios
        .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + book.bookISBN)
        .then((response) => {
          if (response.data.items !== undefined) {
            setBook({ ...book,
              bookThumbURL: response.data.items[0].volumeInfo.imageLinks.thumbnail,
              bookDescription: response.data.items[0].volumeInfo.description
            });
          }
        })
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(()=> {
    getBook();
    getThumb();
  }, [id, book.bookISBN])

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
    const newEditedBook = {
      book_ISBN: book.bookISBN,
      book_title: book.bookTitle,
      book_author: book.bookAuthor,
      book_rating: book.bookRating,
      book_notes: book.bookNotes
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
            <img src={book.bookThumbURL} alt="bookthumb" className="float-left mr-3 mb-1"/>
        </>
    )
  }

  let BookDescription = () => {
    return (
        <>
            {book.bookDescription}
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
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Update Book: {book.bookTitle}</h3>
      {console.log(book.bookISBN)}
      {book.bookISBN !== "" ? <BookInfo/> : ""}
      <hr/>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label>ISBN: </label>
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
            <label className="form-check-label">OK</label>
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
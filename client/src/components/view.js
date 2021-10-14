import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const View = (props) => {
  const [bookISBN, setBookISBN] = useState("");
  const [bookThumbURL, setBookThumbURL] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookRating, setBookRating] = useState("");
  const [bookNotes, setBookNotes] = useState("");

  let {id} = useParams(); //gets the url param

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

    if (bookISBN !== "") {
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
            <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">{bookTitle}</h3>
            {bookISBN !== "" ? <BookInfo/> : ""}
            <hr/>
            <p>ISBN: {bookISBN}</p>
            <p>Title: {bookTitle}</p>
            <p>Author: {bookAuthor}</p>
            <p>Rating: {bookRating}</p>
            <p>Notes: {bookNotes}</p>
            <Link to={"/edit/" + id}>Edit</Link>
        </div>
    );
    }
 
export default View;
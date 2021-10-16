import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const View = (props) => {

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

  //gets auth0 userID then sets variable to owner
  const {user} = useAuth0(); 
  const owner = user.id;

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
            <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">{book.bookTitle}</h3>
            {book.bookISBN !== "" ? <BookInfo/> : ""}
            <hr/>
            <p>ISBN: {book.bookISBN}</p>
            <p>Title: {book.bookTitle}</p>
            <p>Author: {book.bookAuthor}</p>
            <p>Rating: {book.bookRating}</p>
            <p>Notes: {book.bookNotes}</p>
            <Link to={"/edit/" + id}>Edit</Link>
        </div>
    );
    }
 
export default View;
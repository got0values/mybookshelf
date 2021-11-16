import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams, useHistory } from "react-router-dom";

const EditListBook = (props) => {
  const [book, setBook] = useState({
    bookISBN: "",
    bookThumbURL: "",
    bookDescription: "",
    bookTitle: "",
    bookAuthor: "",
    bookRating: "",
    bookNotes: ""
  });

  let {listid, bookid} = useParams(); //gets the book id
  let history = useHistory();

  useEffect(()=> {
    const getThumb = async () => {
        if (book.bookISBN !== "") {
            try {
                await axios
                .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + book.bookISBN)
                .then((response) => {
                if (response.data.items !== undefined) {
                    console.log(response.data.items[0].volumeInfo.imageLinks.thumbnail);
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

    const getBook = async () => {
        console.log(props.server)        
        try {            
        await axios
        .get(props.server + "/booklistbook/" + bookid)
        .then((response) => {
            console.log(response.data)

            for (let i = 0; i < response.data.books.length; i++) {
                if (response.data.books[i]._id === bookid) {
                    const theBook = response.data.books[i];
                    console.log(theBook);
                    setBook({
                        bookISBN: theBook.book_ISBN.replace(/-/g, ''),
                        bookTitle: theBook.book_title,
                        bookAuthor: theBook.book_author,
                        bookRating: theBook.book_rating,
                        bookNotes: theBook.book_notes
                    })
                }
            }
        })
        }catch(e) {
        console.log(e);
        }
    }
    getBook();
    getThumb();
        
    }, [bookid, props.server])

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
        props.server + `/updatelistbook/${listid}/${bookid}`,
        newEditedBook
      )
      .then((res) => console.log(res.data));
 
    history.push(`/viewlistlist/${listid}/${bookid}`);
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
            <BookDescription/>
        </div>
      </div>
    )
  }

  return (
    <div className="container card shadow w-75 fixed-right my-3">
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Update Book: {book.bookTitle}</h3>
      {book.bookISBN !== "" ? <BookInfo/> : ""}
      <hr/>
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
          <Link to={`/viewlistlist/${listid}/${bookid}`}>Back</Link>
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
 
export default EditListBook;
import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const ViewBookListBook = (props) => {

    const [book, setBook] = useState({
        bookISBN: "",
        bookThumbURL: "",
        bookDescription: "",
        bookTitle: "",
        bookAuthor: "",
        bookRating: "",
        bookNotes: ""
      });

    let {bookid, listid} = useParams(); //gets the url param

    useEffect(()=> {
        const getBook = async () => {
        try {
            await axios
            .get(`${props.server}/${listid}/${bookid}`)
            .then((response) => {
                console.log(response.data)
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
    
        getBook();
        getThumb();
    }, [bookid, book.bookISBN])
    
    
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
        <div className="container card shadow w-75 fixed-right my-3">
            <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">{book.bookTitle}</h3>
            {book.bookISBN !== "" ? <BookInfo/> : ""}
            <hr/>
            <p>ISBN: {book.bookISBN}</p>
            <p>Title: {book.bookTitle}</p>
            <p>Author: {book.bookAuthor}</p>
            <p>Rating: {book.bookRating}</p>
            <p>Notes: {book.bookNotes}</p>
            <Link to={"/edit/" + bookid}>Edit</Link>
        </div>
    );

}

export default ViewBookListBook;
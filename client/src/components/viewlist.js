import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ViewList = (props) => {
    let {id} = useParams(); //gets the url param
    const [list, setList] = useState({
        listName: "",
        listDescription: "",
        listBooks: []
    });

    useEffect(()=>{
        try {
            axios
                .get(props.server + "/list/" + id)
                .then((response)=>{
                    setList({
                        listName: response.data.list_name,
                        listDescription: response.data.list_description,
                        listBooks: [...response.data.books]
                    });
                })
        } catch (e) {

        }
    },[id, props.server])

    // This method will delete a book based on the method
    const deleteBooklistBook = async (listid, bookid) => {
        await axios
            .delete(`${props.server}/${listid}/${bookid}`)
            .then((response) => {
                setList({...list, listBooks: [...response.data.books]});
        });
    }

    const Book = (props) => {

        //gets book thumbnail
        const [bookurl, setBookurl] = useState("");
        useEffect(()=>{
            const getThumb = async (isbn) => {
                if (isbn !== "") {
                    try {
                        await axios
                        .get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn)
                        .then((response) => {
                        if (response.data.items !== undefined) {
                            setBookurl(response.data.items[0].volumeInfo.imageLinks.thumbnail)
                            };
                        })
                    } catch (e) {
                        console.log(e);
                    }
                }
                else {
                    setBookurl("https://via.placeholder.com/128x195");
                }
            }
            getThumb(props.book.book_ISBN);
        },[props.book.book_ISBN])

        return (
            <div className="card my-1 mx-3" style={{width: "14rem"}}>
                <Link to={"/view/" + props.book._id} className="d-flex justify-content-center">
                    <img className="card-img-top mt-2" src={bookurl} alt="bookimg" style={{maxHeight: "100%", height: "160px", width: "auto"}}/>
                </Link>
                <div className="mt-auto">
                    <div className="card-header p-0 bg-white d-flex justify-content-center m-1 text-center">{props.book.book_title}</div>
                    <div className="card-body d-flex flex-column">
                        <div>{props.book.book_author}</div>
                        <div>{props.book.book_rating}</div>
                        <div className="mt-auto">
                            <Link to={`/viewlistlist/${id}/${props.book._id}`} className="btn btn-outline-success p-1 px-2 mr-1">View</Link>
                            <a
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                props.deleteBooklistBook(id, props.book._id);
                                window.location.reload(false);
                            }}
                            className="btn btn-outline-danger p-1 ml-1"
                            >
                            Delete
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container w-75 fixed-right">
            <div className="my-3 card shadow">
                <div className="px-2 mt-3 pb-2">
                    <h3 className="d-flex flex-row align-items-center justify-content-center bg-white mt-1">{list.listName} Book List
                    </h3>
                    <div className="row justify-content-center mt-0">
                        {list.listBooks.map((book)=>{
                            return (
                                <Book
                                key={book._id}
                                book={book}
                                deleteBooklistBook={deleteBooklistBook}
                                />
                            )
                        })}
                    </div>
                    <div className="row justify-content-center my-2">
                        <Link to={{
                            pathname: "/addlistbook",
                            state: { 
                                listID: id,
                                listName: list.listName    
                                }
                        }}
                        >
                            <Button variant="success">
                            Add Book
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/booklists'}>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewList;
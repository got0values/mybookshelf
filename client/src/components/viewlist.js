import React, { useState, useEffect } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

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
                    console.log(response.data);
                    setList({
                        listName: response.data.list_name,
                        listDescription: response.data.list_description,
                        listBooks: response.data.books
                    });
                    console.log(list);
                })
        } catch (e) {

        }
    },[id, props.server])

    return (
        <div className="container card shadow w-75 fixed-right my-3">
            <h3 className="d-flex flex-row align-items-center justify-content-center bg-white mt-1">{list.listName} Book List</h3>
            {list.listBooks.map((book)=>{
                return (
                    <div className="card" id={book}>
                        <div className="card-header">{book}</div>
                        <div className="card-body">{book}</div>
                    </div>
                )
            })}
            <Link to="" className="btn btn-success">Add Book</Link>
        </div>
    )
}

export default ViewList;
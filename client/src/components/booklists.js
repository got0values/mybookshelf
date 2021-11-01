import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const BookLists = (props) => {
    return (
        <div className="container w-75 fixed-right my-3 card shadow">
            <div className="px-2 mt-3 pb-2">
                <h3 className="d-flex flex-row align-items-center justify-content-center bg-white mt-1">BookLists</h3>
                
            </div>
        </div>
    )
}

export default BookLists;
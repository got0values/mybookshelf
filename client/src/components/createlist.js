import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const CreateList = (props) => {
    return (
        <div className="container w-75 fixed-right my-3 card shadow">
            <div className="px-2 mt-3 pb-2">
                <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Create List</h3>
                <form onSubmit="">
                    <input type="hidden" value=""/> 
                    <div className="form-group">
                    <label>Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value=""
                        onChange=""
                    />
                    </div>
                    <div className="form-group">
                    <label>Description: </label>
                    <textarea
                        type="text"
                        className="form-control"
                        value=""
                        onChange=""
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="submit"
                        value="Create List"
                        className="btn btn-success"
                    />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateList;
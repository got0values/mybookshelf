import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const CreateList = (props) => {
    const {isAuthenticated, user} = useAuth0();
    const [owner, setOwner] = useState("");
    useEffect(()=>{
        if(isAuthenticated){
        setOwner(user.sub);
        }
    },[isAuthenticated, user])

    const [list, setList] = useState({
        listName: "",
        listDescription: ""
    });

    const onChangeBookListName = (e) => {
        setList({
            ...list,
            listName: e.target.value
        })
    }

    const onChangeBookListDescription = (e) => {
        setList({
            ...list,
            listDescription: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newList = {
            list_name: list.listName,
            list_description: list.listDescription,
            owner: owner
        }
        axios
            .post(props.server + "/list/add", newList)
            .then((res) => console.log(res.data));
    
        setList({
            listName: "",
            listDescription: ""
        })
    }

    return (
        <div className="container w-75 fixed-right my-3 card shadow">
            <div className="px-2 mt-3 pb-2">
                <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Create List</h3>
                <form onSubmit={onSubmit}>
                    <input type="hidden" value={owner}/>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={list.listName}
                            onChange={onChangeBookListName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={list.listDescription}
                            onChange={onChangeBookListDescription}
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
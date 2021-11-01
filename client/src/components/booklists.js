import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const BookLists = (props) => {
    //gets auth0 userID then sets variable to owner
    let {isAuthenticated, user} = useAuth0();

    const [lists, setLists] = useState([]);
    const [owner, setOwner] = useState("");
    const [loading, setLoading] = useState(false);

    //connect to mongodb to get all current record data then set to record state
    useEffect(()=>{
        const fetchLists = async () => {
            if(isAuthenticated){
                setOwner(user.sub);
            }
            try {
                setLoading(true);
                await axios
                    .get(props.server + "/list/", {
                    headers: {
                        reqowner: owner
                    }
                })
                .then((response) => {
                setLists(response.data);
                setLoading(false);
                })
            } catch(error) {
            console.log(error);
            }
        }
        fetchLists();
    },[isAuthenticated, user, owner, props.server]);

    const BookListTable = () => {
        console.log(lists);
        return (
            <table className="table">
                <thead>
                    <th>Name</th>
                    <th>Description</th>
                    <th># of Books</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                    {lists.map((list)=> {
                        return (
                            <tr key={list._id}>
                                <td>{list.list_name}</td>
                                <td>{list.list_description}</td>
                                <td>{list.length}</td>
                                <td>
                                    <Link to={"/viewlist/" + list._id} className="btn btn-outline-success p-1 px-2 mr-1">View</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div className="container w-75 fixed-right my-3 card shadow">
            <div className="px-2 mt-3 pb-2">
                <h3 className="d-flex flex-row align-items-center justify-content-center bg-white mt-1">BookLists</h3>
                {!loading ? BookListTable() : "Loading..."}
            </div>
        </div>
    )
}

export default BookLists;
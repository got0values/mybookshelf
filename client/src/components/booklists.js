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

    // This method will delete a list based
    const deleteList = (id) => {
        axios.delete(props.server + "/list/" + id).then((response) => {
        console.log(response.data);
        });
        setLists(lists.filter((el) => el._id !== id));
    }

    const BookLists = (props) => {
        return (
            <>
                <tr key={props.list._id}>
                    <td>{props.list.list_name}</td>
                    <td>{props.list.list_description}</td>
                    <td>{props.list.books.length}</td>
                    <td>
                        <Link to={"/viewlist/" + props.list._id} className="btn btn-outline-success p-1 px-2 mr-1">View</Link>
                        <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            props.deleteList(props.list._id);
                        }}
                        className="btn btn-outline-danger p-1 ml-1"
                        >
                        Delete
                        </a>
                    </td>
                </tr>
            </>
        )
    }

    const BookListTable = () => {
        return (
            <div className="row justify-content-center">
                <div className="col-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th># of Books</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {lists.map((currentlist) => {
                            return(
                                <BookLists
                                    list={currentlist}
                                    deleteList={deleteList}
                                    key={currentlist._id}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
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
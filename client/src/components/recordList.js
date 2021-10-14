import {useState, useEffect} from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const RecordList = (props) => {
  const [records, setRecords] = useState([]);

  //connect to mongodb to get all current record data then set to record state
  useEffect(()=>{
    const source = axios.CancelToken.source(); //prevent memory leak
    const fetchRecords = async () => {
      try {
        await axios
          .get("http://localhost:5000/record/")
          .then((response) => {
            setRecords(response.data);
          })
      } catch(error) {
        console.log(error);
      }
    }
    fetchRecords();
    return () => {
      source.cancel();
    }
  },[]);

  // This method will delete a record based on the method
  const deleteRecord = (id) => {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });
    setRecords(records.filter((el) => el._id !== id));
  }

  //defines a single record in the recordList map method
  const Record = (props) => (
    <tr className="flex-row align-items-center justify-content-center">
      <td>{props.record.person_name}</td>
      <td>{props.record.person_position}</td>
      <td>{props.record.person_level}</td>
      <td>
        <Link to={"/edit/" + props.record._id} className="btn btn-success shadow mr-1">Edit</Link>
        <a
          href="/"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
          className="btn btn-danger shadow ml-1"
        >
          Delete
        </a>
      </td>
    </tr>
  );

  const recordList = () => {
    return records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  return (
    <div class="container mt-3 card shadow mb-4">
      <h3 className="card-title d-flex flex-row align-items-center justify-content-center bg-white mt-3">Record List</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );

}

export default RecordList;
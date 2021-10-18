import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import bootstrap to make our application look better.
import "startbootstrap-sb-admin-2/css/sb-admin-2.min.css";

// import "./styles/style.css";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import View from "./components/view";
import Edit from "./components/edit";
import Create from "./components/create";
import Bookshelf from "./components/bookshelf";

const App = (props) => {
  return (
    <div className="wrapper" id="wrapper">
      <Navbar />
      <Route exact path="/">
        <Bookshelf server={props.server} />
      </Route>
      <Route path="/view/:id">
        <View server={props.server} />
      </Route>
      <Route path="/edit/:id">
        <Edit server={props.server} />
      </Route>
      <Route path="/create">
        <Create server={props.server} />
      </Route>
    </div>
  );
};

export default App;
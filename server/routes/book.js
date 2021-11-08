const express = require("express");

// bookRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const bookRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const Book = require("../models/book.js");

const List = require("../models/list.js");

const ListBook = require("../models/listbook.js");


// This section will help you get a list of books by owner.
bookRoutes.route("/book").get(function (req, res) {
  let db_connect = dbo.getDb("bookshelf");
  let mycollectionquery = {
    owner: req.headers.reqowner
  }
  db_connect
    .collection("books")
    .find({...mycollectionquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single book record by id
bookRoutes.route("/book/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("books")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new book record.
bookRoutes.route("/book/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newBook = new Book({
    book_ISBN: req.body.book_ISBN,
    book_title: req.body.book_title,
    book_author: req.body.book_author,
    book_rating: req.body.book_rating,
    book_notes: req.body.book_notes,
    owner: req.body.owner
  })
  db_connect.collection("books").insertOne(newBook, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a book record by id.
bookRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        book_ISBN: req.body.book_ISBN,
        book_title: req.body.book_title,
        book_author: req.body.book_author,
        book_rating: req.body.book_rating,
        book_notes: req.body.book_notes
    },
  };
  db_connect
    .collection("books")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a book
bookRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("books").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

// This section will help you create a new book list.
bookRoutes.route("/list/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newList = new List({
    list_name: req.body.list_name,
    list_description: req.body.list_description,
    owner: req.body.owner
  })
  db_connect.collection("booklists").insertOne(newList, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you get a list of lists by user id.
bookRoutes.route("/list").get(function (req, res) {
  let db_connect = dbo.getDb();
  let mycollectionquery = {
    owner: req.headers.reqowner
  }
  db_connect
    .collection("booklists")
    .find({...mycollectionquery})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single list record by id
bookRoutes.route("/list/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("booklists")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you delete a list
bookRoutes.route("/list/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myDeleteListQuery = { _id: ObjectId( req.params.id )};
  db_connect.collection("booklists").deleteOne(myDeleteListQuery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

// This section will help you add a book to a list.
bookRoutes.route("/list/addbook").post(function (req, response) {
  let db_connect = dbo.getDb();
  let list_ID = req.body.list_ID;
  let findListQuery = { _id: ObjectId( list_ID ) };
  let newListBook = new ListBook({
    book_ISBN: req.body.book_ISBN,
    book_title: req.body.book_title,
    book_author: req.body.book_author,
    book_rating: req.body.book_rating,
    book_notes: req.body.book_notes,
    added_by_ID: req.body.added_by_ID
  })
  db_connect
    .collection("booklists")
    .findOneAndUpdate(
      findListQuery,
      {$push: { books: newListBook}},
      function (err, res) {
        if (err) throw err;
        response.json(res);
      }
    );
});

// This section will help you get a single book from booklist id
bookRoutes.route("/:listid/:bookid").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myBookListBookQuery = (
                          {"books._id": ObjectId(req.params.bookid)}
                        );
  db_connect
      .collection("booklists")
      .findOne(myBookListBookQuery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you delete a book from a booklist
bookRoutes.route("/:listid/:bookid").delete((req, response) => {
  let db_connect = dbo.getDb();
  let findBooklistQuery = { _id: ObjectId( req.params.listid )};
  db_connect
    .collection("booklists")
    .findOneAndUpdate(
      findBooklistQuery, 
      {$pull: { books: { _id: ObjectId(req.params.bookid)}
      }},
      {new: true},
      function (err, obj) {
        console.log(req.params)
        if (err) throw err;
        console.log("1 document deleted");
        response.status(obj);
      });
});

module.exports = bookRoutes;
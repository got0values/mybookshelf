const express = require("express");

// bookRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const bookRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const Book = require("../models/book.js")


// This section will help you get a list of records by id.
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

// This section will help you delete a record
bookRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("books").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = bookRoutes;
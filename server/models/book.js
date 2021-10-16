const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_ISBN: String,
    book_title: String,
    book_author: String,
    book_rating: String,
    book_notes: String,
    owner: String
})

module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listBookSchema = new Schema({
    book_ISBN: String,
    book_title: String,
    book_author: String,
    book_rating: String,
    book_notes: String,
    added_by_ID: String
})

module.exports = mongoose.model('ListBook', listBookSchema);
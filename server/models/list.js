const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    list_name: String,
    list_description: String,
    books: [{
        "book_ISBN": String,
        "book_title": String,
        "book_author": String,
        "book_rating": String,
        "book_notes": String,
        "added_by_ID": String
    }],
    owner: String
})

module.exports = mongoose.model('List', listSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    list_name: String,
    list_description: String,
    books: Array,
    owner: String
})

module.exports = mongoose.model('List', listSchema);
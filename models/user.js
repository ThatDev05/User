const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    img: String
    
})

module.exports = mongoose.model('user', userSchema);
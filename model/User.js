const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true,
         min: 2
     },
     email: {
         type: String,
         required: true,
         min: 4
     },
     password: {
         type: String,
         required: true,
         min: 3
     },
     date: {
         type: Date,
         deafult: Date.now
     }
})
module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required:true
    },

    username : {
        type: String,
        required : true
    },

    bio : {
        type: String,
    }
})

module.exports = mongoose.model("User", userSchema);
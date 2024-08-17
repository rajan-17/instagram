const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type:String,
        required :true
    },

    profileImg : {
        type: String,
        default:"https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
    }
});

mongoose.model("UserModel", userSchema);
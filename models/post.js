const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Post schema
const Post = new Schema({
    postId:{type: String},
    id: {type: String},
    name: {type: String},
    email: {type: String},
    body: {type: String}

    
    // title: {
    //     type: String,
    //     required: [true, "Title is required"],
	// 	minlength: 1
    // },
    // create_date: {
    //     type: Date,
    //     required: [true, "Create date is required"]
    // },
    // modified_date: {
    //     type: Date,
    //     required: [true, "Modified date is required"]
    // },
    // username: {
    //     type: String,
    //     required: [true, "Username is required"],
	// 	minlength: 1
    // },
    // content: {
    //     type: String,
    //     required: [true, "Content is required"],
	// 	minlength: [2, "Content must contain at least two characters"],
	// 	maxlength: [10240, "Exceeded maximum content length of 10240 characters"]
    // },
    // category: String,
    // comments:[
    //     {
    //         name: String,
    //         email: String,
    //         body: String
    //     }
    // ]
});

module.exports = mongoose.model('Post', Post);
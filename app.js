const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts_routes');
const fetch = require("node-fetch")
const fs = require('fs')
const Post = require('./models/post');


const port = process.env.port || 3009;

const app = express();
// app.use(cors());
// bodyparser middle ware built into express parses the req.body
 app.use(express.json());

const dbConn = 'mongodb://localhost/blog_mongo_app'
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });


const fetchData = async () => {
    try{
        const dataUrl = 'https://jsonplaceholder.typicode.com/comments'
        const response = await fetch(dataUrl)
        const data = await response.json()
        let json = JSON.stringify( data, null, 2 );
        
        // fs.writeFile('comments.json', json, 'utf8', (err) =>{
        //     if (err) throw err;
        //     console.log('Data Written to file')
        // });
        // let newPost = new Post({ title: 'test' });
        // await newPost.save();
        // Post.findOne({title: 'test'}).exec((err, post)=>{
        //     if(err){
        //         console.log(err)
        //     }else{
        //         console.log(json)
        //         console.log(post)
        //         // post.InsertMany(json).exec((err,post)=>{
        //         //     if(err){
        //         //         console.log(err)
        //         //     }else {
        //         //         console.log("success")
        //         //     }
        //         // })
        //         // console.log("suucess")
        //     }
        // })
        Post.insertMany(json, function(err, docs){
            if(err){
                console.log(err)
            }else{
                console.log("SUCCESS")
                console.log(docs)
            }
        })

    } catch(err) {
        console.log(err)
    }
}

fetchData();


app.get('/', (req, res) => {
    console.log("get on /");
    res.send("got your request");
})

app.use('/posts', postRouter);

app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});

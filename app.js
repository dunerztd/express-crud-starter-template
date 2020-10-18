const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const expressSession = require('express-session')
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');

const postRouter = require('./routes/posts_routes');
const authRouter = require('./routes/auth_routes');

const port = process.env.port || 3009;

const app = express();
// app.use(cors());
// bodyparser middle ware built into express parses the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// express session
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

const dbConn = 'mongodb://localhost/blog_app'
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

// handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    console.log("get on /");
    console.log(req.user);

    // renders home through handlebars plus passing variable for denoting whether user is logged in
    res.render("home", 
    { loggedIn: req.user });
})


app.use('/posts', postRouter);
app.use('/user', authRouter);

app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});
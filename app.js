const express = require("express");
const pug = require("pug");
const data = require("./data.json");
const bodyParser = require('body-parser');
const app = express();
const projects = data.projects;


// makes working with incoming data easier.
//turned from a string into data your application can use
//for parsing applications
app.use(bodyParser.urlencoded({ extended: false}));

// setting up the pug.  update code in app to use pug.
app.set('view engine', 'pug');


app.use('/static', express.static('public'));

//express.static(root, [options])


// Adding routes.
//This will show the projects in the home section.  

app.get('/', (req, res)=> {
    res.render('index', {projects});
});

app.get('/about', (req, res)=> {
    res.render('about');
});


app.get('/projects:id', (req, res)=> {
    res.render('project', {projects});
});
//Dynamic routes


//handling errors: •	In Express, you can use the next function to signal an error in your app.

app.use((req, res, next)=> {
    const err = new Error('Oops! This page does not exist.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
   res.locals.error = err;

   res.status(404);
   //res.status(err.status);
    res.render('error', err);
});

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     if (error.status === 'undefined') {
//         error.status = 500;
//         res.status(error.status);
//     }
//     res.render('error');
// });


app.listen(3000, ()=> console.log("server is running"));
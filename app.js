// Importing some node libraries to the file.
const express = require("express");
const data = require("./data.json");
const bodyParser = require('body-parser');
const app = express();  //create the app object using our imported express module


//This makes working with incoming data easier.
//turned from a string into data your application can use
//for parsing applications
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug'); //set the 'view engine' value to specify the pug library.

// We use the express.static middleware to get Express to serve the static files located in the public folder in the project root.
app.use('/static', express.static('public'));


///////////////////  ROUTES //////////////////////

//This will display the projects in the home section.  
app.get('/', (req, res)=> {
    res.render('index', {projects: data.projects});
});

//This will show the about page.
app.get('/about', (req, res)=> {
    res.render('about');
});

//Dynamic project routes to render a unique project page page that will show off each project.  
app.get('/projects/:id', (req, res)=> {
    console.log(req.params.id);
    res.render('project', {
        project: data.projects[req.params.id - 1],
        id: req.params.id
    });
});


// catching an error 404 and forwarding to error handler
app.use((req, res, next)=> {
    console.log("Error");
    const err = new Error('Oops! This page does not exist.');  //creating an error object
    err.status = 404;  // setting error status to 404
    next(err);  // This signals errors on app
});


// Handling error
app.use((err, req, res, next)=>{
   res.locals.error = err;
   res.render('error', err);  //rendering the error template passing in the error data from err object.
});




app.listen(3000, ()=> console.log("server is running"));
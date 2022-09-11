const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
// port 
const port = 4040;



// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(path.join(__dirname,'.','website')));


// Setup Server
app.listen(port, function(){
    console.log(`The server is running in: http://localhost:${port}`);
});

// get data
app.get('/getAllData', (req, res) => {
    res.send(projectData).status(200);
});


//post data 

app.post('/postAllData',(req, res) => {

    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    }
    

    res.send(projectData).status(200);
});

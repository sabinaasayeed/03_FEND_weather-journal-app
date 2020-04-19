// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);

/***********************************************************************************************************
 * NAME :     listening(req, res)
 *
 * DESCRIPTION : Callback function for listen server
 *
 * INPUTS :
 *           
 * OUTPUTS 

 * USAGE: 
 * 
 ************************************************************************************************************/
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', getData);

/***********************************************************************************************************
 * NAME :     getData(req, res)
 *
 * DESCRIPTION : Callback function for GET route for '/all'
 *
 * INPUTS :
 *       req: request received from  GET
 *       res: response from  GET
 *           
 * OUTPUTS 
 *       projectData: return golab var projectData
 * USAGE: 
 *     app.get('/all', getData)
 * 
 ************************************************************************************************************/
function getData(req, res) {
    console.log('received GET request: all');
    res.send(projectData);
    console.log(projectData);

};


// POST route
app.post('/addWeather', addWeather);

/***********************************************************************************************************
 * NAME :     addWeather(req, res)
 *
 * DESCRIPTION : Callback function for POST route for '/addWeather'
 *
 * INPUTS :
 *       req: request received from  GET
 *       res: response from  GET
 *           
 * OUTPUTS 
 *       projectData: return golab var projectData
 * USAGE: 
 *     app.post('/addWeather', addWeather);
 * 
 ************************************************************************************************************/
function addWeather(req, res) {
    console.log('received POST request: addWeather');
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;

    console.log(projectData);
    res.send(projectData);
};

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// GET route
app.get('/allData', sendData);

function sendData(request, response) {
    response.send(projectData);
};

// post route
app.post('/add', addData);

function addData(req, res) {
    console.log(req.body);
    projectData = {
        "temperature": req.body.temperature,
        "date": req.body.date,
        "user_response":req.body.user_response
    }
    res.send('data received');
};


const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

const allowedOrigins = [
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
};

var users = [];

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.post('/signup', cors(corsOptions), (req, res) => {
  console.log(req.params);
  return res.send('Received a POST HTTP method');
});

app.post('/login', cors(corsOptions), (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.post('/email', cors(corsOptions), (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.get('/email', cors(corsOptions), (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

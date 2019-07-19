const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express().use(bodyParser.json());
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
// Mock emails to be retrieved via GET
var emails = [
  { folder: 'inbox',    to: 'test@example.com',         from: 'josephwebber@hotmail.com', timestamp: new Date().getTime(),           subject: 'Hi',                  body: 'Hello' },
  { folder: 'sent',     to: 'josephwebber@hotmail.com', from: 'test@example.com',         timestamp: new Date().getTime() - 700000,  subject: 'Re: Hi',              body: 'Hello' },
  { folder: 'archived', to: 'test@example.com',         from: 'abc123@email.com',         timestamp: new Date().getTime() - 150000,  subject: "Check this out",      body: "<img src='https://twistedsifter.files.wordpress.com/2018/11/bird-with-funny-eyes-on-strip-of-paper-9.jpg?w=764&h=767'></img>" },
  { folder: 'sent',     to: 'bestfriend@email.com',     from: 'test@example.com',         timestamp: new Date().getTime() - 850000,  subject: "How's it going?",     body: "Let's hit up the golf course after work today, eh?" },
  { folder: 'inbox',    to: 'test@example.com',         from: 'bestfriend@email.com',     timestamp: new Date().getTime() - 380000,  subject: "Re: How's it going?", body: "Sure thing, buddy!" }
];

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.post('/signup', cors(corsOptions), (req, res) => {
  //console.log('body', req.body);

  if (req.body && req.body.email && !users.find(user => user.email === req.body.email)) {
    users.push(req.body);
    delete req.body.password;
    return res.json({
      'status': 'success',
      'user': req.body
    });
  }
  else {
    return res.json({
      'status': 'error',
      'message': 'An account with that email already exists.'
    });
  }
});

app.post('/login', cors(corsOptions), (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  if (email && password && users.find(user => user.email === email) && users.find(user => user.email === email).password === password) {
    let user = users.find(user => user.email === email);
    return res.json({
      'status': 'success',
      'user': {
        'name': user.name,
        'email': user.email
      }
    });
  }
  else {
    return res.json({
      'status': 'error',
      'message': 'Error logging in.'
    });
  }
});

app.post('/email', cors(corsOptions), (req, res) => {
  req.body.timestamp = new Date().getTime();
  emails.push(req.body);
});

app.get('/email', cors(corsOptions), (req, res) => {
  // Page name (inbox, sent, archive).
  let pageName = req.body.pageName;
  // Page number. 0 for first page, 1 for second, etc.
  let pageNumber = req.body.pageNumber;
  // Number of emails shown per page.
  let pageSize = req.body.pageSize;
  // The user to get the emails for
  let user = req.body.user;

  if (!pageName || !pageNumber || !pageSize || !user) {
    return {
      'status': 'error',
      'message': 'Invalid arguments'
    };
  }

  // Return sorted and sliced emails for current page name and number
  return {
    'status': 'success',
    'emails': emails.filter(email => email.to === req.body.user.email && email.folder === pageName).sort((a, b) => a.timestamp > b.timestamp).slice(pageNumber, pageNumber * pageSize)
  };
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

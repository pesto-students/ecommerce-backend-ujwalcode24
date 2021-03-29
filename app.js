const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const mongoose = require('mongoose');

const path = require('path');
const config = require('./config/database');

dotenv.config();

// MOGODB Connection
mongoose.connect(config.database, { useNewUrlParser: true }, () => {
  console.log('db connection established');
});

// DB on Successful Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to the database', config.database);
});

// DB on Error Connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to the database', config.database);
// });

// Creating express application
const app = express();

// linking user routes
const test = require('./routes/test');
const auth = require('./routes/auth');
const product = require('./routes/product');

// Port Number
const port = process.env.PORT || 8080;

// MIDDLEWARE: cors - allows requests to the api from different domain name
app.use(cors());

// MIDDLEWARE: body parser - parses incomming request body
app.use(express.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting up test routes
app.use('/__test', test);
app.use('/user', auth);
app.use('/product', product);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port', port);
});

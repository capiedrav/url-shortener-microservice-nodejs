require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require("./urls.js");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({extended: false})); // middleware for handling form data
app.use("/api", apiRouter); // "apiRouter" handle requests to the "/api" endpoint

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

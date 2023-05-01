const express = require("express")
const dns = require("dns")
const router = express.Router()

let database = []; // to store url entries
let shortUrlId = 1; // id of a url

function urlShortener(request, response){
  // shortens the url passed in the form
  
  const url = request.body.url; // get the url passed in the form input
   
  if (url.includes("http") || url.includes("https")){ // check url format
    const shortUrlJson = {original_url: url, short_url: shortUrlId}; // construct response  
    database.push(shortUrlJson); // save response in database    
    response.json(shortUrlJson); // send response
    shortUrlId++;
    
  }
  else{ 
    response.json({error: "invalid url"}); // send error message
  }
  
}

function translateShortUrl(request, response){
  // translates a short url to its original url.
  
  const shortUrl = parseInt(request.params.urlShort); // get short url passed in the url
  
  if (!isNaN(shortUrl)){ // shortUrl is an int
    const urlData = database.filter(url => url.short_url === shortUrl)[0] // lookup url in database (filter returns an array, that's why [0])    
    if (urlData){ // short url found in the database     
      response.redirect(urlData.original_url); // redirect to the original url
    }
    else{ // short url not found in database
      response.json({error: "short url not found"}); // send error message
    }
    
  }
  else { // short url is not an int
    response.json({error: "invalid url"}); // send error message
  }
  
}

// Your first API endpoint
router.get('/hello', function(req, res) { // serve GET requests to "/api/hello" endpoint
  res.json({ greeting: 'hello API' });
});


router.post("/shorturl/", urlShortener); // serve POST requests to "/api/shorturl" endpoint
router.get("/shorturl/:urlShort", translateShortUrl); // serve GET requests to "/api/shorturl/:urlShort" endpoint

module.exports = router;

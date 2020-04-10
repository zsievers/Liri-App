require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

// var spotify = new Spotify ({
//     id: keys.spotify.id,
//     secret: keys.spotify.secret
// });
 
var spotify = new Spotify(keys.spotify);
// var bandsintown = require('bandsintown')(faebdcb4e9367a333fbae3f0451c4891);
// // var bandsintown = require('bandsintown')(codingbootcamp);

// var omdb = require('omdb');

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });




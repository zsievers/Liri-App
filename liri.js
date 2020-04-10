require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// var spotify = new Spotify ({
//     id: keys.spotify.id,
//     secret: keys.spotify.secret
// });
 
var spotify = new Spotify(keys.spotify);
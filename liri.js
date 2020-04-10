require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

// var bandsintown = require('bandsintown')(codingbootcamp);

// var omdb = require('omdb');

var spotify = new Spotify(keys.spotify);
// var bandsintown = require('bandsintown')(faebdcb4e9367a333fbae3f0451c4891);
// var bandsintown = require('bandsintown')(codingbootcamp);
// var omdb = require('omdb');

if (process.argv[2] === "spotify-this-song"){
    var song = process.argv.slice(3, process.argv.length).join(" ");
} 
else {
    var song = process.argv.slice(2, process.argv.length).join(" ");
}


spotify.search({ type: 'track', query: song, limit: "3"}, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
        
        var songs = data.tracks.items;
            for(i = 0; i < songs.length; i++){
                console.log(i)
                console.log("Artisit(s): " + songs[i].artists[0].name);
                console.log("Song Name: " + songs[i].name);
                console.log("Preview Song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("=======================================================================")
            }
      });




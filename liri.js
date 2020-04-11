require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var omdb = require('omdb');
// var bandsintown = require('bandsintown')(faebdcb4e9367a333fbae3f0451c4891);

var spotify = new Spotify(keys.spotify);


// var bandsintown = require('bandsintown')(codingbootcamp);

// ==========================================================================================================
// spotify

var liriSpotify = function(song) {

    if (process.argv[2] === "spotify-this-song"){
        var song = process.argv.slice(3, process.argv.length).join(" ");
    } 
    else {
        var song = process.argv.slice(2, process.argv.length).join(" ");
    };
    
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
}

liriSpotify();

      
// =================================================================================================================
// OMDB

var liriMovie = function(movie){

    if (process.argv[2] === "movie-this"){
        var movie = process.argv.slice(3, process.argv.length).join(" "); 
    }
    else {
        var movie = process.argv.slice(2, process.argv.length).join(" ");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);
    
    axios.get(queryUrl).then(function(response){
        console.log("")
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Rated: " + response.data.Rated);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
        console.log("Country Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Main Actors: " + response.data.Actors);
        console.log("=======================================================================");
    });

}
liriMovie();




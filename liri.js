// requiring .env file
require("dotenv").config();

// requiring moment
var moment = require("moment");

// require file systems
var fs = require("fs");

// linking key page
var keys = require("./keys.js");

// initializing spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// requiring axios, omdb and bands in town
var axios = require("axios");
var omdb = require('omdb');
// var bandsintown = require('bandsintown')(faebdcb4e9367a333fbae3f0451c4891);

// USER COMMAND AND INPUT
var userInput = process.argv[2];
var userQuery = process.argv[3];

// APP LOGIC -- switchback function
function command(userInput, userQuery) {
  switch (userInput) {
    case "concert-this":
      concertThis();
      break;
    case "spotify-this-song":
      spotifyThisSong(userQuery);
      break;
    case "movie-this":
      movieThis(userQuery);
      break;
    case "do-what-it-says":
      doWhatItSays(userQuery);
      break;
    default:
      console.log("I don't know that one");
      break;
  }
}
command(userInput, userQuery);

// CONCERT-THIS

// SPOTIFY-THIS-SONG

function spotifyThisSong() {
  console.log(
    "\n--------------------------------------------------------\n\nI found it!"
  );

  console.log("\n--------------------------------------------------------\n");

  spotify.search({ type: "track", query: userQuery, limit: "3" }, function (
    err,
    data
  ) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;
    for (i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("Artisit(s): " + songs[i].artists[0].name);
      console.log("Song Name: " + songs[i].name);
      console.log("Preview Song: " + songs[i].external_urls.spotify);
      console.log("Album: " + songs[i].album.name);
      console.log(
        "\n---------------------------------------------------------\n"
      );
    }
  });
}

// MOVIE-THIS

function movieThis() {
  console.log("\n--------------------------------------------------------\n\nI found it!");
  console.log("\n--------------------------------------------------------\n");

  if (!userQuery) {
    userQuery = "mr nobody";
  }

    var queryUrl ="http://www.omdbapi.com/?t=" + userQuery +"&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {
      console.log("");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("Rated: " + response.data.Rated);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
      console.log("Country Produced: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Main Actors: " + response.data.Actors);
      console.log("\n");
      console.log("=======================================================================");
    });
  };


// DO-WHAT-IT-SAYS
// var liriConcert

// if (process.argv[2] === "concert-this"){
//     var artist = process.argv.slice(3, process.argv.length).join(" ");
// }
// else {
//     var artist = process.argv.slice(2, prcess.argv.length).join(" ");
// }

// bandsintown.getArtistEventList('Skrillex')
//   .then(function(events) {
//     // return array of events
//   });

// ==========================================================================================================
// spotify

// var liriSpotify = function(song) {

//     if (process.argv[2] === "spotify-this-song"){
//         var song = process.argv.slice(3, process.argv.length).join(" ");
//     }
//     else {
//         var song = process.argv.slice(2, process.argv.length).join(" ");
//     };

//     spotify.search({ type: 'track', query: song, limit: "3"}, function(err, data) {
//             if (err) {
//               console.log('Error occurred: ' + err);
//               return;
//             }

//             var songs = data.tracks.items;
//                 for(i = 0; i < songs.length; i++){
//                     console.log(i)
//                     console.log("Artisit(s): " + songs[i].artists[0].name);
//                     console.log("Song Name: " + songs[i].name);
//                     console.log("Preview Song: " + songs[i].preview_url);
//                     console.log("Album: " + songs[i].album.name);
//                     console.log("=======================================================================")
//                 }
//           });
// }

// liriSpotify();

// =================================================================================================================
// OMDB

// var liriMovie = function(movie){

//     if (process.argv[2] === "movie-this"){
//         var movie = process.argv.slice(3, process.argv.length).join(" ");
//     }
//     else {
//         var movie = process.argv.slice(2, process.argv.length).join(" ");
//     }
//     var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
//     // console.log(queryUrl);

//     axios.get(queryUrl).then(function(response){
//         console.log("")
//         console.log("Title: " + response.data.Title);
//         console.log("Release Year: " + response.data.Year);
//         console.log("Rated: " + response.data.Rated);
//         console.log("IMDB Rating: " + response.data.imdbRating);
//         console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
//         console.log("Country Produced: " + response.data.Country);
//         console.log("Language: " + response.data.Language);
//         console.log("Plot: " + response.data.Plot);
//         console.log("Main Actors: " + response.data.Actors);
//         console.log("=======================================================================");
//     });

// }
// liriMovie();

// ==================================================================================
// DO WHAT IT SAYS LIRI -- FS READFILE FROM RANDOM TXT

// var doWhatItSays = function(){

//     fs.readFile('random.txt', 'utf8', function(err, data) {
//         if (err) {
//             return console.log(error)
//         }

//         var dataArr = data.split(",");

//         if (dataArr.length === 2) {
//             return dataArr[0], data[1];
//         }
//         else if (dataArr.length === 1) {
//             return dataArry[0]
//         }

//     });

// }

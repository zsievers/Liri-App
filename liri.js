// requiring .env file
require("dotenv").config();

// requiring moment
var moment = require("moment");

// require file systems
var fs = require("fs");

// colors
var colors =  require('colors');

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
var appCommand = process.argv[2];
var userSearch = process.argv[3];

// APP LOGIC -- switch case statement
function command(appCommand, userSearch) {
  switch (appCommand) {
    case "concert-this":
      concertThis(userSearch);
      break;
    case "spotify-this-song":
      spotifyThisSong(userSearch);
      break;
    case "movie-this":
      movieThis(userSearch);
      break;
    case "do-what-it-says":
      doWhatItSays(userSearch);
      break;
    default:
      console.log(colors.red("\n*****I don't know that one. Try checking your spelling!"));
      break;
  }
}
command(appCommand, userSearch);


// CONCERT-THIS

function concertThis() {

    var artist = userSearch;
    var bandQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=faebdcb4e9367a333fbae3f0451c4891";

    axios.get(bandQueryUrl).then(function(response) {
        console.log("")
        console.log("\n--------------------------------------------------------\n\nI found it!");
        console.log("\n--------------------------------------------------------\n");
        console.log(colors.magenta("Venue Name: ") + response.data[0].venue.name);
        console.log(colors.magenta("Venue Location: ") + response.data[0].venue.city);
        console.log(colors.magenta("Concert Date: ") + moment(response.data[0].datetime).format("MM-DD-YYYY"));

    });
}

// SPOTIFY-THIS-SONG

function spotifyThisSong() {
    console.log("\n--------------------------------------------------------\n\nI found it!");
    console.log("\n--------------------------------------------------------\n");

    if (!userSearch) {
        userSearch = "The Sign";
      }

  spotify.search({ type: "track", query: userSearch, limit: "10" }, function (err,data) {
    if (err) {
      console.log("Error occurred: " + err.red);
      return;
    }

    var songs = data.tracks.items;

    for (i = 0; i < songs.length; i++) {
      console.log(colors.green("Artisit(s): ") + songs[i].artists[0].name);
      console.log(colors.green("Song Name: ") + songs[i].name);
      console.log(colors.green("Preview Song: ") + songs[i].external_urls.spotify);
      console.log(colors.green("Album Title: ") + songs[i].album.name);
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

  if (!userSearch) {
    userSearch = "Mr. Nobody";
  }

    var queryUrl ="http://www.omdbapi.com/?t=" + userSearch +"&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {
      console.log("");
      console.log(colors.yellow("Title: ") + response.data.Title);
      console.log(colors.yellow("Release Year: ") + response.data.Year);
      console.log(colors.yellow("Rated: ") + response.data.Rated);
      console.log(colors.yellow("IMDB Rating: ") + response.data.imdbRating);
      console.log(colors.yellow("Rotten Tomatoes Rating: ") + response.data.Metascore);
      console.log(colors.yellow("Country Produced: ") + response.data.Country);
      console.log(colors.yellow("Language: ") + response.data.Language);
      console.log(colors.yellow("Plot: ") + response.data.Plot);
      console.log(colors.yellow("Main Actors: ") + response.data.Actors);
      console.log("\n");
      console.log("=======================================================================");
    });
};

// DO-WHAT-IT-SAYS

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err,data){
        if (err) {
            return console.log(err);
        };
        var dataArr = data.split(",");

        appCommand = dataArr[0];
        userSearch = dataArr[1];
        
        command(appCommand, userSearch);
    });
};














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


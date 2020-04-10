var axios = require("axios");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
    id: "9971584172e44e49019d48e365ed825",
    secret: "d8473711650b4e579e5a8c176f36e2a7"
  });

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
//Twitter npm information
var Twitter = require('twitter');
var Keys = require('./keys.js');

//Spotify npm information
var spotify = require('spotify');

//Request npm information
var request = require('request');

var userCommand = process.argv;

//Twitter Auth
var twitterClient = new Twitter({
  consumer_key: Keys.twitterKeys.consumer_key,
  consumer_secret: Keys.twitterKeys.consumer_secret,
  access_token_key: Keys.twitterKeys.access_token_key,
  access_token_secret: Keys.twitterKeys.access_token_secret
});

// //Twitter call
twitterClient.get('statuses/user_timeline', 'count=20', function(error, tweets, response) {
  if (error) {
    console.log("Error has occurred with the Twitter request: " + error);
    throw error;
  }
  console.log("\n\nHere are your last 20 tweets: ");
  for ( var i = 0; i < tweets.length; i++ ) {
    console.log("\n" + tweets[i].created_at + "\n--------------------------------\n" + tweets[i].text + "\n");
  }
});

//Spotify search -- type === track because user is only entering a song name to search for
spotify.search({ type: 'track', query: 'mexican sun' } , function(err, response) {
  if (err) {
    console.log("Error has occurred with the Spotify request: " + err);
    return;
  }
  //Spotify's info is nested so lets store it for ease of use
  var data = response.tracks.items;

  console.log("\nHere is the info about your song(s): \n");
  for ( var i = 0; i < data.length; i++ ) {
    var result = data[i];
    //Since some of the songs will return with multiple artists we have to provide a check and loop through that data
    if (result.artists.length > 1) {
      console.log("Artist: This song had multiple artists! (See below)");
      var index = 0;
      while (typeof result.artists[index] !== 'undefined') {
        console.log("* " + result.artists[index].name);
        index++;
      }
    }else {
      console.log("Artist: " + result.artists[0].name);
    }
    console.log("Song Title: " + result.name + "Album: " + result.album.name + "\nSpotify Preview URL: " + result.preview_url);
    console.log("\n------------------------\n");
  }
});

request( 'http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("\nHere is the info about your movie: \n");
    console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\nRotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
  }else {
    console.log("Error has occurred with OMDB request: " + error);
  }
});

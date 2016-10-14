var Twitter = require('twitter');
var Keys = require('./keys.js');

var userCommand = process.argv;

var twitterClient = new Twitter({
  consumer_key: Keys.twitterKeys.consumer_key,
  consumer_secret: Keys.twitterKeys.consumer_secret,
  access_token_key: Keys.twitterKeys.access_token_key,
  access_token_secret: Keys.twitterKeys.access_token_secret
});

twitterClient.get('statuses/user_timeline', 'count=20', function(error, tweets, response) {
  if (error) throw error;
  console.log(tweets);
});

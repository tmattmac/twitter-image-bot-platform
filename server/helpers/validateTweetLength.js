const twitter = require('twitter-text');

function validateTweetLength(text) {
  const parsed = twitter.parseTweet(text);
  return parsed.weightedLength <= 280;
}

module.exports = validateTweetLength;

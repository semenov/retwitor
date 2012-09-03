var twitter = require('ntwitter'),
    _ = require('underscore'),
    config = require('./config'),
    twi = new twitter(config.keys);

twi.stream('statuses/filter', {track: config.keyword}, function(stream) {
  stream.on('data', function (data) {
    if (!data.retweeted_status) {
        var user = data.user.screen_name.toLowerCase();
        if (_.include(config.users, user)) {
            twi.retweetStatus(data.id_str, function() {});
        }
    }
  });
});
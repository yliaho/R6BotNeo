var Api = require('./api');
module.exports = function (options) {
    // If user agent isn't defined, define it.
    options.user_agent = options.user_agent || "Reddit-Watcher-V2";
    var api = Api(options);
    return {
        api: api,
    };
};

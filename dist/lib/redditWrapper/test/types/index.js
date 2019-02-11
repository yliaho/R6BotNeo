"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var reddit_wrapper_v2_1 = __importDefault(require("reddit-wrapper-v2"));
// All API Options
var options = {
    api_secret: '',
    app_id: '',
    username: '',
    password: '',
    user_agent: '',
    retry_on_wait: false,
    retry_on_server_error: 0,
    retry_delay: 0,
    logs: false
};
/**
 * We just need to satisfy typescript with correct types, so we're enclosing
 * the code to a function and never run it.
 */
function enclose() {
    // Include all possible options.
    var r1 = reddit_wrapper_v2_1.default(options);
    // Include only required options.
    var r2 = reddit_wrapper_v2_1.default({
        app_id: options.app_id,
        api_secret: options.api_secret,
        username: options.username,
        password: options.password
    });
    // HTTP Methods.
    var onFulfill = function (responses) { return null; };
    var onReject = function (err) { return null; };
    bluebird_1.Promise.all([
        r1.api.get('', {}),
        r1.api.post('', {}),
        r1.api.patch('', {}),
        r1.api.put('', {}),
        r1.api.del('', {})
    ]).then(onFulfill).catch(onReject);
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
var reddit_wrapper_1 = __importDefault(require("@/lib/redditWrapper/reddit-wrapper"));
var snoowrap_1 = __importDefault(require("snoowrap"));
exports.r = reddit_wrapper_1.default({
    api_secret: process.env.R_CLIENT_SECRET,
    app_id: process.env.R_CLIENT_ID,
    user_agent: 'bot for r/Rainbow6 subreddit',
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD
});
exports.snoowrap = new snoowrap_1.default({
    clientSecret: process.env.R_CLIENT_SECRET,
    clientId: process.env.R_CLIENT_ID,
    userAgent: 'bot for r/Rainbow6 subreddit',
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD
});

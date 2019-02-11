"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var snoowrap_1 = __importDefault(require("snoowrap"));
exports.r = new snoowrap_1.default({
    userAgent: 'bot for r/Rainbow6 subreddit',
    username: process.env.R_USERNAME,
    password: process.env.R_PASSWORD,
    clientId: process.env.R_CLIENT_ID,
    clientSecret: process.env.R_CLIENT_SECRET,
    //@ts-ignore
    scope: ['structuredstyles']
});

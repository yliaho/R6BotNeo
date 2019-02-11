"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
exports.twitchInstance = axios_1.default.create({
    baseURL: 'https://api.twitch.tv/helix',
    timeout: 5000,
    headers: {
        'Client-ID': process.env.T_CLIENT_ID
    }
});

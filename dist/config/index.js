"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config({
    sample: '.env.example',
    path: '.env'
});

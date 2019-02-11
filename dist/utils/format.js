"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(str, arr) {
    return str.replace(/%(\d+)/g, function (_, m) {
        return arr[--m];
    });
}
exports.format = format;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redditWrapper_1 = require("@/config/redditWrapper");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var request_1 = __importDefault(require("request"));
var api = redditWrapper_1.r.api;
var Reddit = /** @class */ (function () {
    function Reddit(connector) {
        this.connector = connector;
        this.defaultSubreddit = process.env.R_SUBREDDIT;
    }
    Reddit.prototype.getWidgets = function (subreddit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!subreddit) {
                            subreddit = this.defaultSubreddit;
                        }
                        return [4 /*yield*/, this.connector.get("/r/" + subreddit + "/api/widgets")];
                    case 1:
                        _a = _b.sent(), statusCode = _a[0], body = _a[1];
                        return [2 /*return*/, body.items];
                }
            });
        });
    };
    Reddit.prototype.getWidget = function (_a) {
        var subreddit = _a.subreddit, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!subreddit) {
                    subreddit = this.defaultSubreddit;
                }
                return [2 /*return*/, this.getWidgets(subreddit).then(function (widgets) { return widgets[id]; })];
            });
        });
    };
    Reddit.prototype.addCustomWidget = function (widgetData, subreddit) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, body;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('add');
                        if (!subreddit) {
                            subreddit = this.defaultSubreddit;
                        }
                        return [4 /*yield*/, this.connector.post("/r/" + subreddit + "/api/widget", __assign({}, widgetData, { kind: 'custom' }))];
                    case 1:
                        _a = _b.sent(), statusCode = _a[0], body = _a[1];
                        console.log(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    Reddit.prototype.updateWidget = function (widgetData, _a) {
        var subreddit = _a.subreddit, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var widget, _b, statusCode, body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!subreddit) {
                            subreddit = this.defaultSubreddit;
                        }
                        return [4 /*yield*/, this.getWidget({ subreddit: subreddit, id: id })];
                    case 1:
                        widget = _c.sent();
                        return [4 /*yield*/, this.connector.put("/r/" + subreddit + "/api/widget/" + id, __assign({}, widget, widgetData))];
                    case 2:
                        _b = _c.sent(), statusCode = _b[0], body = _b[1];
                        console.log(body);
                        return [2 /*return*/, body];
                }
            });
        });
    };
    Reddit.prototype.deleteWidget = function (_a) {
        var subreddit = _a.subreddit, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var widget, statusCode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!subreddit) {
                            subreddit = this.defaultSubreddit;
                        }
                        return [4 /*yield*/, this.getWidget({ id: id })];
                    case 1:
                        widget = _b.sent();
                        return [4 /*yield*/, this.connector.del("/r/" + subreddit + "/api/widget/" + widget.id)];
                    case 2:
                        statusCode = (_b.sent())[0];
                        return [2 /*return*/, widget];
                }
            });
        });
    };
    Reddit.prototype.deleteWidgetsByShortName = function (shortname, subreddit) {
        return __awaiter(this, void 0, void 0, function () {
            var widgets, widgetsToRemove;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('fuck?');
                        if (!subreddit) {
                            subreddit = this.defaultSubreddit;
                        }
                        return [4 /*yield*/, this.getWidgets('Rainbow6')];
                    case 1:
                        widgets = _a.sent();
                        widgetsToRemove = Object.values(widgets).filter(function (widget) { return widget.shortName === shortname; });
                        widgetsToRemove.forEach(function (_a) {
                            var id = _a.id;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            _c = (_b = console).log;
                                            return [4 /*yield*/, this.deleteWidget({ id: id })];
                                        case 1:
                                            _c.apply(_b, [_d.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Reddit.prototype.uploadImage = function (filebase, name) {
        if (name === void 0) { name = 'stream-thumbnail'; }
        return redditWrapper_1.snoowrap.getSubreddit(this.defaultSubreddit).uploadStylesheetImage({
            file: path_1.default.resolve(process.cwd(), filebase),
            imageType: 'jpg',
            name: 'stream-thumbnail'
        });
    };
    Reddit.prototype.s3_bucket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s3UploadLease, action, fields, formData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, redditWrapper_1.snoowrap.oauthRequest({
                            uri: 'r/Rainbow6/api/widget_image_upload_s3',
                            method: 'post',
                            formData: {
                                filepath: 'woah.jpg',
                                mimetype: 'image/jpg'
                            }
                        })];
                    case 1:
                        s3UploadLease = (_a.sent()).s3UploadLease;
                        action = s3UploadLease.action, fields = s3UploadLease.fields;
                        formData = {};
                        fields.forEach(function (_a) {
                            var name = _a.name, value = _a.value;
                            formData[name] = value;
                        });
                        formData['file'] = fs_1.readFileSync(path_1.default.resolve(process.cwd(), 'woah.jpg'));
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                request_1.default
                                    .post("https:" + action, {
                                    headers: {
                                        'Content-Type': 'application/xml'
                                    },
                                    formData: formData
                                })
                                    .on('response', function (resp) {
                                    resolve(decodeURIComponent(resp.headers.location));
                                })
                                    .on('error', function (err) { return reject(err); });
                            })
                            // return snoowrap.oauthRequest({
                            //   url: `https:`,
                            //   uri: `${action}`,
                            //   headers: {
                            //     'Content-Type': 'application/xml'
                            //   },
                            //   formData
                            // })
                        ];
                }
            });
        });
    };
    return Reddit;
}());
exports.Reddit = Reddit;

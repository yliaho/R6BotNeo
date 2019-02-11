"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var fs_1 = require("fs");
var util_1 = require("util");
var path_1 = __importDefault(require("path"));
var taskBase_1 = require("./taskBase");
var format_1 = require("@/utils/format");
var downloadImage_1 = require("@/utils/downloadImage");
var readFileAsync = util_1.promisify(fs_1.readFile);
var Task = /** @class */ (function (_super) {
    __extends(Task, _super);
    function Task(services) {
        var _this = _super.call(this, services) || this;
        _this.state = {
            stream: null,
            widget: null
        };
        return _this;
    }
    Task.prototype.generateMarkdown = function (_a) {
        var user_name = _a.user_name, viewer_count = _a.viewer_count, title = _a.title;
        return __awaiter(this, void 0, void 0, function () {
            var markdown;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getFileAsString('streamWidget.md')];
                    case 1:
                        markdown = _b.sent();
                        return [2 /*return*/, format_1.format(markdown, [user_name, title, viewer_count])];
                }
            });
        });
    };
    Task.prototype.getFileAsString = function (filename) {
        return readFileAsync(path_1.default.resolve(process.cwd(), filename), {
            encoding: 'utf8'
        });
    };
    Task.prototype.removeWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.services.reddit.deleteWidgetsByShortName('R6.StreamNotifier')];
                    case 1:
                        _a.sent();
                        this.state.widget = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    Task.prototype.prepareThumbnail = function (thumbnail_url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, downloadImage_1.downloadImage(thumbnail_url, path_1.default.resolve(process.cwd(), 'woah.jpg'))
                        //@ts-ignore
                    ];
                    case 1:
                        _a.sent();
                        //@ts-ignore
                        return [4 /*yield*/, this.services.reddit.uploadImage('woah.jpg')];
                    case 2:
                        //@ts-ignore
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Task.prototype.updateWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, viewer_count, title, thumbnail_url, user_name, widgetData, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.state.stream, viewer_count = _a.viewer_count, title = _a.title, thumbnail_url = _a.thumbnail_url, user_name = _a.user_name;
                        _b = {};
                        return [4 /*yield*/, this.getFileAsString('streamWidget.css')];
                    case 1:
                        _b.css = _e.sent();
                        return [4 /*yield*/, this.generateMarkdown({ user_name: user_name, title: title, viewer_count: viewer_count })];
                    case 2:
                        widgetData = (_b.text = _e.sent(),
                            _b.imageData = [],
                            _b.height = 343,
                            _b.shortName = 'R6.StreamNotifier',
                            _b.styles = {
                                backgroundColor: '',
                                headerColor: ''
                            },
                            _b);
                        if (!!this.state.widget) return [3 /*break*/, 4];
                        _c = this.state;
                        return [4 /*yield*/, this.services.reddit.addCustomWidget(widgetData, 'Rainbow6')];
                    case 3:
                        _c.widget = _e.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        _d = this.state;
                        return [4 /*yield*/, this.services.reddit.updateWidget(widgetData, {
                                subreddit: 'Rainbow6',
                                id: this.state.widget.id
                            })];
                    case 5:
                        _d.widget = _e.sent();
                        _e.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Task.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.services.reddit.deleteWidgetsByShortName('R6.StreamNotifier');
                return [2 /*return*/];
            });
        });
    };
    Task.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.state;
                        return [4 /*yield*/, this.services.twitch.getStream('65171890')];
                    case 1:
                        _a.stream = _b.sent();
                        if (this.state.stream) {
                            console.log('user is streaming');
                            this.updateWidget();
                        }
                        else {
                            if (!this.state.widget) {
                                console.log('user is not streaming');
                                return [2 /*return*/];
                            }
                            console.log('user stopped streaming, removing');
                            this.removeWidget();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Task;
}(taskBase_1.TaskBase));
exports.Task = Task;

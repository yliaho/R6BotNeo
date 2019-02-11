"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Runner = /** @class */ (function () {
    function Runner(tasks, intervalInMinutes) {
        this.tasks = tasks;
        this.intervalInMinutes = intervalInMinutes;
    }
    Runner.prototype.start = function () {
        var _this = this;
        this.tasks.forEach(function (task) {
            task.init();
        });
        setInterval(function () {
            _this.tasks.forEach(function (task) {
                task.run();
            });
        }, this.intervalInMinutes * 1000);
    };
    return Runner;
}());
exports.Runner = Runner;

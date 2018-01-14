"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Awaitr = /** @class */ (function () {
    function Awaitr() {
        this.finished = false;
        this.underway = false;
        this.callbacks = [];
    }
    Awaitr.prototype.wrap = function (wrappedMethod) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve = resolve || (function () { });
            if (_this.finished) {
                resolve();
                return;
            }
            _this.callbacks.push({ resolve: resolve, reject: reject });
            if (!_this.underway) {
                _this.underway = true;
                wrappedMethod().then(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // console.log('wrappedMethod resolved!');
                    _this.finished = true;
                    _this.callbacks.forEach(function (cb) {
                        cb.resolve.apply(cb, args);
                    });
                    _this.callbacks = [];
                })
                    .catch(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // console.log('wrappedMethod rejected!');
                    _this.callbacks.forEach(function (cb) {
                        if (cb.reject)
                            cb.reject.apply(cb, args);
                    });
                    _this.callbacks = [];
                });
            }
        });
    };
    return Awaitr;
}());
exports.Awaitr = Awaitr;

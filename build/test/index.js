"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var xhrService = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve({
                    username: 'testrrr',
                    email: 'test@test.com'
                });
            }, 1300);
        });
    }
};
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.initializeAwaitr = new __1.Awaitr();
    }
    TestClass.prototype.initialize = function () {
        var _this = this;
        return this.initializeAwaitr.wrap(function () {
            console.log('initializing...');
            return xhrService.get('user/getUser')
                .then(function (userData) {
                _this.userData = userData;
                console.log('finished initializing...');
            });
            // .catch(() => {
            //     console.log('ERROR: access denied');
            // });
        });
    };
    return TestClass;
}());
var test = new TestClass();
test.initialize();
setTimeout(function () {
    test.initialize()
        .then(function () {
        console.log('--> init callback 1', test.userData);
    });
    test.initialize().then(function () {
        console.log('--> init callback 2', test.userData);
    });
    test.initialize().then(function () {
        console.log('--> init callback 2.3', test.userData);
    });
    test.initialize().then(function () {
        console.log('--> init callback 2.7', test.userData);
    });
    setTimeout(function () {
        test.initialize().then(function () {
            console.log('--> init callback 3', test.userData);
        });
    }, 2000);
    setTimeout(function () {
        test.initialize().then(function () {
            console.log('--> init callback 4', test.userData);
        });
    }, 3000);
}, 500);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let xhrService = {
    get: function (url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    username: 'testrrr',
                    email: 'test@test.com'
                });
            }, 1000);
        });
    }
};
class Awaitr {
    constructor() {
        this.finished = false;
        this.underway = false;
        this.callbacks = [];
    }
    wrap(wrappedMethod, newCallback) {
        if (this.finished) {
            newCallback();
            return;
        }
        this.callbacks.push(newCallback);
        if (!this.underway) {
            this.underway = true;
            wrappedMethod().then(() => {
                this.finished = true;
                this.callbacks.forEach((cb) => {
                    cb();
                });
                this.callbacks = [];
            });
        }
    }
}
class TestClass {
    constructor() {
        this.initializeAwaitr = new Awaitr();
    }
    initialize() {
        return new Promise((resolve) => {
            this.initializeAwaitr.wrap(() => {
                console.log('initializing...');
                return xhrService.get('user/getUser')
                    .then((userData) => {
                    this.userData = userData;
                    console.log('finished initializing...');
                });
            }, resolve);
        });
    }
}
let test = new TestClass();
test.initialize().then(() => {
    console.log('--> init callback 1', test.userData);
});
test.initialize().then(() => {
    console.log('--> init callback 2', test.userData);
});
test.initialize().then(() => {
    console.log('--> init callback 2.3', test.userData);
});
test.initialize().then(() => {
    console.log('--> init callback 2.7', test.userData);
});
setTimeout(() => {
    test.initialize().then(() => {
        console.log('--> init callback 3', test.userData);
    });
}, 2000);
setTimeout(() => {
    test.initialize().then(() => {
        console.log('--> init callback 4', test.userData);
    });
}, 3000);

import { doAsSoonAs } from '..';

let xhrService = {  // XHR Service mock
    get: function(url: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {      
                resolve({
                    username: 'testrrr',
                    email: 'test@test.com'
                });
            }, 10000);
        })
    }
}

class Awaitr {
    private finished = false;
    private underway = false;
    private callbacks: Array<() => void> = [];

    public wrap(wrappedMethod: () => Promise<any>): Promise<any> {
        return new Promise((resolve) => {
            if(this.finished) {
                resolve();
                return;
            }

            this.callbacks.push(resolve);

            if(!this.underway) {
                this.underway = true;

                wrappedMethod().then(() => {
                    this.finished = true;
                    this.callbacks.forEach((cb) => {
                        cb();
                    });
                    this.callbacks = [];
                    resolve();
                })         
            }
        });
    }
}

class TestClass {

    public userData: Object;

    private initializeAwaitr = new Awaitr();

    constructor() {}

    initialize (): Promise<any> {
        return this.initializeAwaitr.wrap(() => {
            console.log('initializing...');
            return xhrService.get('user/getUser')
            .then((userData) => {
                this.userData = userData;
                console.log('finished initializing...');
            });
        });
    }
}


let test = new TestClass();

test.initialize();

setTimeout(() => {
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
        })
    }, 2000);
    
    setTimeout(() => {
        test.initialize().then(() => {
            console.log('--> init callback 4', test.userData);
        })
    }, 3000);
}, 500);
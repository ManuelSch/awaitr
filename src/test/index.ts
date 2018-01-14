import { Awaitr } from '..';

let xhrService = {  // XHR Service mock
    get: function(url: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {      
                resolve(
                    {
                    username: 'testrrr',
                    email: 'test@test.com'
                }
                );
            }, 1300);
        });
    }
}


class TestClass {

    public userData: Object;

    private initializeAwaitr = new Awaitr();

    initialize (): Promise<any> {
        return this.initializeAwaitr.wrap(() => {
            console.log('initializing...');
            return xhrService.get('user/getUser')
            .then((userData) => {
                this.userData = userData;
                console.log('finished initializing...');
            })
            // .catch(() => {
            //     console.log('ERROR: access denied');
            // });
        });
    }
}


let test = new TestClass();

test.initialize();

setTimeout(() => {
    test.initialize()
    .then(() => {
        console.log('--> init callback 1', test.userData);
    })
    
    test.initialize().then(() => {
        console.log('--> init callback 2', test.userData);
    })
    
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
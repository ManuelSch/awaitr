
export class Awaitr {
    private finished = false;
    private underway = false;
    private callbacks: Array<{
        resolve: (...args: any[]) => void,
        reject: (...args: any[]) => void
    }> = [];

    public wrap(wrappedMethod: () => Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {

            resolve = resolve || (() => {});

            if(this.finished) {
                resolve();
                return;
            }

            this.callbacks.push({resolve: resolve, reject: reject});

            if(!this.underway) {
                this.underway = true;

                wrappedMethod().then((...args: any[]) => {
                    // console.log('wrappedMethod resolved!');
                    this.finished = true;
                    this.callbacks.forEach((cb) => {
                        cb.resolve(...args);
                    });
                    this.callbacks = [];
                })
                .catch((...args: any[]) => {
                    // console.log('wrappedMethod rejected!');
                    this.callbacks.forEach((cb) => {
                        if(cb.reject) cb.reject(...args);
                    });
                    this.callbacks = [];
                });
            }
        });
    }
}
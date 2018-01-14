export declare class Awaitr {
    private finished;
    private underway;
    private callbacks;
    wrap(wrappedMethod: () => Promise<any>): Promise<any>;
}

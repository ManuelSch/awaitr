export declare function doAsSoonAs<T>(baseObject: Object, method: (...args: any[]) => T, callback: (returnValue?: T) => void): {
    stop: () => void;
};

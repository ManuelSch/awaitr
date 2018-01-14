// const methodNameRegex = /^\s*function\s*([^\(]*)/i;
const methodNameRegex = /\w+/;

export function doAsSoonAs<T>(
    baseObject: Object,
    method: (...args: any[]) => T,
    callback: (returnValue?: T) => void
): { stop: () => void } {
    return {
        stop: () => {
            
        }
    };
};
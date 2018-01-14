"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const methodNameRegex = /^\s*function\s*([^\(]*)/i;
const methodNameRegex = /\w+/;
function doAsSoonAs(baseObject, method, callback) {
    return {
        stop: () => {
        }
    };
}
exports.doAsSoonAs = doAsSoonAs;
;

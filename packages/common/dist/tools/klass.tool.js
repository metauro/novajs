"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class KlassTool {
    /**
     * @param target
     * @returns prototype chain, exclude Object.prototype and Function
     */
    static getPrototypes(target) {
        const prototypes = [];
        let proto = Object.getPrototypeOf(target);
        while (proto && proto !== Object.prototype && proto !== Function) {
            prototypes.push(proto);
            proto = Object.getPrototypeOf(proto);
        }
        return prototypes;
    }
    static getOwnerFunctionKeys(target) {
        return Object.getOwnPropertyNames(target).filter(k => lodash_1.isFunction(target[k]));
    }
    static getFunctionKeys(target) {
        const result = [];
        [target, ...this.getPrototypes(target)].forEach(p => result.push(...this.getOwnerFunctionKeys(p)));
        return result;
    }
}
exports.KlassTool = KlassTool;
//# sourceMappingURL=klass.tool.js.map
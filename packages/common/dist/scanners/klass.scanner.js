"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_class_1 = __importDefault(require("is-class"));
const module_scanner_1 = require("./module.scanner");
class KlassScanner {
    static scan(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield module_scanner_1.ModuleScanner.scan(dir)).reduce((result, module) => {
                for (const val of Object.values(module.exports)) {
                    if (is_class_1.default(val)) {
                        result.push(Object.assign(Object.assign({}, module), { type: val }));
                    }
                }
                return result;
            }, []);
        });
    }
}
exports.KlassScanner = KlassScanner;
//# sourceMappingURL=klass.scanner.js.map
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
class ResourceScanner {
    static scan(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cache.get(dir)) {
                return this.cache.get(dir);
            }
            const result = [];
            for (const name of yield fs.readdir(dir)) {
                const absolutePath = path.join(dir, name);
                const parsedPath = path.parse(absolutePath);
                const stat = yield fs.stat(absolutePath);
                const isDir = stat.isDirectory();
                const filenameSplit = isDir ? null : parsedPath.base.split('.');
                if (isDir) {
                    result.push(...(yield ResourceScanner.scan(absolutePath)));
                }
                else {
                    result.push(Object.assign(Object.assign({}, parsedPath), { path: absolutePath, infix: filenameSplit && filenameSplit.length > 2
                            ? filenameSplit[filenameSplit.length - 2]
                            : null, suffix: parsedPath.ext.slice(1), content: yield fs.readFile(absolutePath, 'utf8') }));
                }
            }
            this.cache.set(dir, result);
            return result;
        });
    }
    /**
     * scan resources filter by infix
     * @param infix - file infix
     * @param dir - search dir
     */
    static scanByInfix(dir, infix) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield ResourceScanner.scan(dir)).filter(resource => resource.infix === infix);
        });
    }
    /**
     * scan resources filter by suffix
     * @param suffix - file suffix
     * @param dir - search dir
     */
    static scanBySuffix(dir, suffix) {
        return __awaiter(this, void 0, void 0, function* () {
            suffix = suffix.startsWith('.') ? suffix : '.' + suffix;
            return (yield ResourceScanner.scan(dir)).filter(resource => resource.ext === suffix);
        });
    }
}
exports.ResourceScanner = ResourceScanner;
ResourceScanner.cache = new Map();
//# sourceMappingURL=resource.scanner.js.map
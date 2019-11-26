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
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const common_1 = require("@fastify-plus/common");
class ServiceScanner {
    static scan(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield common_1.KlassScanner.scan(dir)).filter(k => k.infix === 'service' ||
                !!common_1.ReflectTool.getMetadata(constants_1.CORE_METADATA.SERVICE, k.type));
        });
    }
}
exports.ServiceScanner = ServiceScanner;
//# sourceMappingURL=service.scanner.js.map
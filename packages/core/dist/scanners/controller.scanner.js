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
const common_1 = require("@fastify-plus/common");
const constants_1 = require("../constants");
const http_response_1 = require("../http-response");
const common_2 = require("@fastify-plus/common");
class ControllerScanner {
    static scan(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const klasses = yield common_2.KlassScanner.scan(dir);
            const result = [];
            for (const klass of klasses) {
                const controllerMetadata = common_1.ReflectTool.getMetadata(constants_1.CORE_METADATA.CONTROLLER, klass.type);
                if (!controllerMetadata) {
                    continue;
                }
                const target = klass.type.prototype;
                const routes = [];
                for (const key of common_1.KlassTool.getOwnerFunctionKeys(target)) {
                    const requestMappingMetadata = common_1.ReflectTool.getMetadata(constants_1.CORE_METADATA.REQUEST_MAPPING, target[key]);
                    if (!requestMappingMetadata) {
                        continue;
                    }
                    const params = (common_1.ReflectTool.getMetadata(common_1.COMMON_METADATA.PARAM_TYPES, target, key) || []).map(t => ({
                        useParamKey: t === http_response_1.HttpResponse || t === http_response_1.Http2Response ? 'response' : 'request',
                        type: t,
                    }));
                    const requestDataMetadata = common_1.ReflectTool.getMetadata(constants_1.CORE_METADATA.REQUEST_DATA, target, key) || [];
                    requestDataMetadata.forEach((m, i) => {
                        m && (params[i].useParamKey += `.${m.place}`);
                    });
                    let path = controllerMetadata.prefix + (requestMappingMetadata.path || '');
                    // remove surplus /
                    for (let i = 0, len = path.length; i < len; i++) {
                        if (path[i] === '/' && path[i + 1] === '/') {
                            path = path.slice(i + 1);
                        }
                    }
                    routes.push({
                        key,
                        handler: klass.type.prototype[key],
                        path,
                        method: requestMappingMetadata.method,
                        returnType: common_1.ReflectTool.getMetadata(common_1.COMMON_METADATA.RETURN_TYPE, klass.type.prototype, key),
                        params,
                    });
                }
                result.push({
                    klass,
                    routes,
                });
            }
            return result;
        });
    }
}
exports.ControllerScanner = ControllerScanner;
//# sourceMappingURL=controller.scanner.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_js_1 = require("injection-js");
const constants_1 = require("../constants");
const common_1 = require("@fastify-plus/common");
function Service() {
    return (target) => {
        common_1.ReflectTool.defineMetadata(constants_1.CORE_METADATA.SERVICE, null, target);
        injection_js_1.Injectable()(target);
        return target;
    };
}
exports.Service = Service;
//# sourceMappingURL=service.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@fastify-plus/common");
const constants_1 = require("../constants");
function Controller(prefixOrOptions) {
    let prefix = prefixOrOptions
        ? typeof prefixOrOptions === 'string'
            ? prefixOrOptions
            : prefixOrOptions.prefix
        : '';
    if (!prefix.startsWith('/')) {
        prefix = '/' + prefix;
    }
    return common_1.ReflectTool.createClassDecorator(constants_1.CORE_METADATA.CONTROLLER, {
        prefix,
    });
}
exports.Controller = Controller;
//# sourceMappingURL=controller.decorator.js.map
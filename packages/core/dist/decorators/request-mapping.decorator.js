"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const common_1 = require("@fastify-plus/common");
const RequestMapping = (options) => {
    return common_1.ReflectTool.createMethodDecorator(constants_1.CORE_METADATA.REQUEST_MAPPING, {
        path: options.path || '',
        method: options.method || 'GET',
    });
};
const createRequestMapping = (method) => (path) => {
    return RequestMapping({
        path,
        method,
    });
};
exports.Get = createRequestMapping('GET');
exports.Post = createRequestMapping('POST');
exports.Put = createRequestMapping('PUT');
exports.Patch = createRequestMapping('PATCH');
exports.Delete = createRequestMapping('DELETE');
exports.Head = createRequestMapping('HEAD');
exports.Options = createRequestMapping('OPTIONS');
//# sourceMappingURL=request-mapping.decorator.js.map
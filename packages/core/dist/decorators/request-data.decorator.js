"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const common_1 = require("@fastify-plus/common");
function createRequestData(place) {
    return function () {
        return common_1.ReflectTool.createParamDecorator(constants_1.CORE_METADATA.REQUEST_DATA, {
            place,
        });
    };
}
exports.RequestHeaders = createRequestData('headers');
exports.RequestParams = createRequestData('params');
exports.RequestQuery = createRequestData('query');
exports.RequestBody = createRequestData('body');
//# sourceMappingURL=request-data.decorator.js.map
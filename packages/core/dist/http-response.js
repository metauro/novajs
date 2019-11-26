"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    callNotFound() {
        return void 0;
    }
    code(statusCode) {
        return undefined;
    }
    getHeader(name) {
        return undefined;
    }
    getResponseTime() {
        return 0;
    }
    hasHeader(name) {
        return false;
    }
    header(name, value) {
        return undefined;
    }
    headers(headers) {
        return undefined;
    }
    redirect(statusCodeOrUrl, url) {
        return undefined;
    }
    removeHeader(name) {
        return undefined;
    }
    send(payload) {
        return undefined;
    }
    serialize(payload) {
        return '';
    }
    serializer(fn) {
        return undefined;
    }
    status(statusCode) {
        return undefined;
    }
    type(contentType) {
        return undefined;
    }
}
exports.HttpResponse = HttpResponse;
class Http2Response {
    callNotFound() {
        return;
    }
    code(statusCode) {
        return undefined;
    }
    getHeader(name) {
        return undefined;
    }
    getResponseTime() {
        return 0;
    }
    hasHeader(name) {
        return false;
    }
    header(name, value) {
        return undefined;
    }
    headers(headers) {
        return undefined;
    }
    redirect(statusCodeOrUrl, url) {
        return undefined;
    }
    removeHeader(name) {
        return undefined;
    }
    send(payload) {
        return undefined;
    }
    serialize(payload) {
        return '';
    }
    serializer(fn) {
        return undefined;
    }
    status(statusCode) {
        return undefined;
    }
    type(contentType) {
        return undefined;
    }
}
exports.Http2Response = Http2Response;
//# sourceMappingURL=http-response.js.map
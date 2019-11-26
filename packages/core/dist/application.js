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
const fastify_1 = __importDefault(require("fastify"));
const injection_js_1 = require("injection-js");
const common_1 = require("@fastify-plus/common");
const services_1 = require("./services");
const controller_handler_1 = require("./controller-handler");
class FastifyPlusApplication {
    constructor(ctx) {
        this.ctx = ctx;
    }
    static create(options, http = fastify_1.default(options.fastifyOptions)) {
        return __awaiter(this, void 0, void 0, function* () {
            const klasses = yield common_1.KlassScanner.scan(options.appRootPath);
            return new FastifyPlusApplication(Object.assign({ http,
                klasses, injector: injection_js_1.ReflectiveInjector.resolveAndCreate(klasses.map(k => k.type)) }, options));
        });
    }
    getContext() {
        return this.ctx;
    }
    getFastifyInstance() {
        return this.ctx.http;
    }
    start(port, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_handler_1.ControllerHandler(this.ctx);
            yield controller.registerControllers();
            yield this.listen(port, address);
        });
    }
    listen(port, address) {
        const { http } = this.ctx;
        http.listen(port, address || 'localhost', (err, address) => {
            if (err) {
                throw err;
            }
            services_1.internalLoggerService.info(`The server has listen on ${address}`);
        });
    }
}
exports.FastifyPlusApplication = FastifyPlusApplication;
//# sourceMappingURL=application.js.map
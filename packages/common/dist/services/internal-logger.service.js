"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = require("lodash");
class InternalLoggerService {
    silly(messageOrObject) {
        this.log('silly', messageOrObject, chalk_1.default.gray);
    }
    debug(messageOrObject) {
        this.log('debug', messageOrObject, chalk_1.default.cyan);
    }
    info(messageOrObject) {
        this.log('info', messageOrObject, chalk_1.default.green);
    }
    warn(messageOrObject) {
        this.log('warn', messageOrObject, chalk_1.default.yellow.bold);
    }
    error(messageOrObject) {
        this.log('error', messageOrObject, chalk_1.default.red.bold);
    }
    fatal(messageOrObject) {
        this.log('fatal', messageOrObject, chalk_1.default.magenta.bold);
    }
    log(loggerLevel, message, chalked) {
        chalked = chalked || chalk_1.default.white;
        process.stdout.write(chalked(`\n[Fastify Plus ${lodash_1.upperFirst(loggerLevel)}]: ${typeof message === 'string' ? message : JSON.stringify(message)}`));
    }
}
exports.InternalLoggerService = InternalLoggerService;
exports.internalLoggerService = new InternalLoggerService();
//# sourceMappingURL=internal-logger.service.js.map
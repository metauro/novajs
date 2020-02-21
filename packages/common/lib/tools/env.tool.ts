export class EnvTool {
  static inTsEnv() {
    return process.env._.includes('ts-node') || !!process.env.JEST_WORKER_ID;
  }

  static inJsEnv() {
    return !this.inTsEnv();
  }
}

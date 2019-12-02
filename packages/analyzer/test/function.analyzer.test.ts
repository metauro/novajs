import { FunctionAnalyzer } from '../lib/function.analyzer';

describe('function analyzer', () => {
  it('should match function param names', () => {
    expect(
      FunctionAnalyzer.getParamNames(function(a: string, b: number) {}),
    ).toEqual(['a', 'b']);

    expect(
      FunctionAnalyzer.getParamNames(function named(a: string, b: number) {
        {
          function a(a: string, c: number) {}
        }
        return 'function test(bc, zc) {}';
      }),
    ).toEqual(['a', 'b']);
  });
});

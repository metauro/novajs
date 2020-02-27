import { ReflectTool } from '@novajs/common';
import { CORE_METADATA } from '../constants';

export function Req() {
  return ReflectTool.createParamDecorator(CORE_METADATA.REQ, true);
}

export function Res() {
  return ReflectTool.createParamDecorator(CORE_METADATA.RES, true);
}

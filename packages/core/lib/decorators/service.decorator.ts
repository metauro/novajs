import { Class } from 'utility-types';
import { Injectable } from 'injection-js';
import { CORE_METADATA } from '../constants';
import { ReflectTool } from '@novajs/common';

export function Service() {
  return (target: Class<any>) => {
    ReflectTool.defineMetadata(CORE_METADATA.SERVICE, null, target);
    Injectable()(target);
    return target;
  };
}

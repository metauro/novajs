import { Class } from 'utility-types';
import { Injectable } from 'injection-js';

export function Service() {
  return (target: Class<any>) => {
    Injectable()(target);
    return target;
  };
}

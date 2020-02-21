import { Class } from 'utility-types';
import { Module } from './module.interface';

export type Klass = {
  /**
   * class reference
   */
  type: Class<any>;
} & Module;

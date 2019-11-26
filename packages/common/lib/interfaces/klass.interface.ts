import { Class } from 'utility-types';
import { Module } from './module.interface';

export type Klass = {
  type: Class<any>;
} & Module;

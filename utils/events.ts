import { EventEmitter } from 'events';

export const authEventEmitter = new EventEmitter();
export const AUTH_EVENTS = {
  TOKEN_CHANGE: 'TOKEN_CHANGE'
};

import {User} from './user';
import {Action} from './action';

export interface Message {
  client?: any;
    from?: User;
    content?: any;
    action?: Action;
    sala?: string;
}
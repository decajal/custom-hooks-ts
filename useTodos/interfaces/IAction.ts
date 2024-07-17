import { ActionType } from '../enums/action_type';
import { ITodo } from './ITodo';

export interface IAction {
  type: ActionType;
  payload: ITodo | number;
}

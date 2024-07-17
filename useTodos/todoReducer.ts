import { ActionType } from './enums/action_type';
import { ITodo, IAction } from './interfaces';

export const todoReducer = (initialState: ITodo[] = [], action: IAction): ITodo[] => {
  switch (action.type) {
    case ActionType.ADD:
      return [...initialState, action.payload as ITodo];
    case ActionType.REMOVE:
      return initialState.filter((todo) => todo.id !== action.payload);
    case ActionType.TOGGLE:
      return initialState.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done,
          };
        }

        return todo;
      });

    default:
      return initialState;
  }
};

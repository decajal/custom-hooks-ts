import { useEffect, useReducer } from 'react';

import { IAction, ITodo } from './interfaces';
import { ActionType } from './enums/action_type';

const initialState: ITodo[] = [];

const init = (): ITodo[] => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

const todoReducer = (initialState: ITodo[] = [], action: IAction): ITodo[] => {
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

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo: ITodo) => {
    const action: IAction = {
      type: ActionType.ADD,
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (todo: ITodo) => {
    const action: IAction = {
      type: ActionType.REMOVE,
      payload: todo,
    };

    dispatch(action);
  };

  const handleToggleTodo = (todo: ITodo) => {
    const action: IAction = {
      type: ActionType.TOGGLE,
      payload: todo,
    };

    dispatch(action);
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};

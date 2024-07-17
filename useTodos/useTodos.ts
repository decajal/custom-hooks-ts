import { useEffect, useReducer } from 'react';

import { ActionType } from './enums/action_type';
import { IAction, ITodo } from './interfaces';
import { todoReducer } from './todoReducer';

const initialState: ITodo[] = [];

const init = (): ITodo[] => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
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

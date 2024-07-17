import { useEffect, useState } from 'react';
import { IState } from './interfaces';

const localCahce: { [key: string]: IState } = {};

export const useFetch = (url: string) => {
  const initialState: IState = {
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState(initialState);
  };

  const getFetch = async () => {
    const pokemonFromLocalCache = localCahce[url];
    if (pokemonFromLocalCache) {
      // Existe => lo toma desde la caché local
      setState({
        data: pokemonFromLocalCache,
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }

    setLoadingState();
    const response = await fetch(url);
    if (!response.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: response.status,
          message: response.statusText,
        },
      });
      return;
    }
    const data = await response.json();
    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null,
    });
    // guarda el nuevo pokemon en la caché local
    localCahce[url] = data;
    // Sobre el uso de caché:
    // https://tanstack.com/query/latest
    // https://fernando-herrera.com/course/react-query/  // <-- Curso gratuito
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};

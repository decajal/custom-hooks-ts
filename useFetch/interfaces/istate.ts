import { IError } from './ierror';

export interface IState {
  data: unknown;
  isLoading: boolean;
  hasError: boolean;
  error: IError | null;
}

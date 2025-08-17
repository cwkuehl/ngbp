import { AppErrorModel } from './app-error.model';

export interface ApiResponseData<T> {
  data: T | null;
  error: AppErrorModel | null;
}

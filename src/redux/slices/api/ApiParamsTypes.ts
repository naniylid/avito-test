import { Movies } from '../../../@types/MoviePropsTypes';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchParams = {
  sortType: number;
  page: number;
  sortField: string;
  notNullFields: string;
  limit: number;
  query: string;
  search: string;
};

export interface FetchSliceState {
  items: Movies[];
  status: Status;
}

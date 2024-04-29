export enum SortPropertyEnum {
  YEAR_DESC = 'year',
  YEAR_ASC = '-year',
  COUNTRY_DESC = 'countries.name',
  COUNTRY_ASC = '-countries.name',
  AGE_DESC = 'ageRating',
  AGE_ASC = '-ageRating',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  page: number;
  sort: SortType;
  limit: number;
  open?: boolean;
  value?: string;
}

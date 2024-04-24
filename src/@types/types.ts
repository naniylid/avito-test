export type Movies = {
  id: number;
  movieId: number;
  name: string;
  alternativeName?: string;
  year: number;
  genres?: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  description?: string;
  rating?: {
    kp: number;
  };
  ageRating?: number;
  poster: {
    url: string;
  };
  persons: {
    name: string;
    profession?: string;
    id?: number;
  }[];
  similarMovies?: {
    id: number;
    poster: {
      previewUrl: string;
    };
  }[];
};

export type MovieResponse = {
  docs: Movies[];
};

export type Review = {
  movieId: number;
  author: string;
  title: string;
  review: string;
};

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
}

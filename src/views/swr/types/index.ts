export interface PageList<T> {
  content: T[];
  size: number;
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  sort: object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

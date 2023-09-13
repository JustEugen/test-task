import { PaginationReq } from '@utils/ts/pagination-req';

export interface PaginationRes<T> extends PaginationReq {
  entities: T[];
  count: number;
}

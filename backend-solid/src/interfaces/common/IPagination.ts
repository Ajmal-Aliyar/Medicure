export interface IPagination {
    skip: number,
    limit: number,
}

export interface PaginationMeta {
  total: number;
  skip: number;
  limit: number;
  totalPages: number;
}
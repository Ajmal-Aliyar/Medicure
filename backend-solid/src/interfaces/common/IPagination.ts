export interface IPagination {
    skip: number,
    limit: number,
}

export interface PaginationMeta {
  page: number
  totalPages: number;
}
import { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findAll(options: FindAllOptions<T>): Promise<{ data: T[]; total: number }>
}

export interface FindAllOptions<T> {
  filter?: FilterQuery<T>;
  skip?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}
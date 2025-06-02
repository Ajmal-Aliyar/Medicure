import { FilterQuery, UpdateQuery } from "mongoose";

export interface IBaseRepository<T> {
  findById(id: string): Promise<T | null>;
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
}
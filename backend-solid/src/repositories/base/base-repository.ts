import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { IBaseRepository } from "../interfaces";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(item: Partial<T>): Promise<T> {
    return this.model.create(item as any);
  }
  
  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }
  
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }
  
  // async findAll(): Promise<T[]> {
  //   return this.model.find().exec();
  // }
  // async delete(id: string): Promise<T | null> {
  //   return this.model.findByIdAndDelete(id).exec();
  // }
}

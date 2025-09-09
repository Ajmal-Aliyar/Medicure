import { Model, Document, FilterQuery } from "mongoose";
import { FindAllOptions, IBaseRepository } from "../interfaces";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected _model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    return this._model.findById(id).exec();
  }

  async create(item: Partial<T>): Promise<T> {
    return this._model.create(item as any);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this._model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this._model.findOne(filter).exec();
  }

  async findAll({
    filter = {},
    skip = 0,
    limit = 12,
    sort = { createdAt: 1 },
  }: FindAllOptions<T> = {}): Promise<{ data: T[]; total: number }> {
    const [data, total] = await Promise.all([
      this._model.find(filter).skip(skip).limit(limit).sort(sort),
      this._model.countDocuments(filter),
    ]);
    return { data, total };
  }

  // async delete(id: string): Promise<T | null> {
  //   return this._model.findByIdAndDelete(id).exec();
  // }
}

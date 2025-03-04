import { Model } from "mongoose";
import { BaseSchema } from "src/utils/base-entity";
import { Response } from "./response";

export abstract class BaseService<T extends BaseSchema> {
  constructor(private readonly repository: Model<T>) {}

  async findAll(): Promise<T[] | Response<T>> {
    try {
      return this.repository.find({});
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findById(id: any): Promise<T | Response<T>> {
    try {
      const data = await this.repository.findOne({ _id: id });
      if (!data) return { success: false, error: `Data not found.` };

      return data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async create(data: any): Promise<T | Response<T>> {
    try {
      const entity = new this.repository(data);
      await entity.save();
      return entity;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id: string, updateValue: any): Promise<any> {
    try {
      await this.repository.findOneAndUpdate(
        { _id: id },
        {
          ...updateValue,
        },
        { new: true }
      );
      return this.findById(id);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async remove(id: string): Promise<Response<T>> {
    try {
      await this.repository.deleteOne({ _id: id });
      return { success: true, error: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

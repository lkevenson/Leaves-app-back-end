import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/utils/base-services";
import { Setting } from "./entities/setting.schema";

@Injectable()
export class SettingsService extends BaseService<Setting> {
  constructor(
    @InjectModel(Setting.name) protected readonly settingModel: Model<Setting>
  ) {
    super(settingModel);
  }

  async findAll(): Promise<Setting[] | any> {
    try {
      return await this.settingModel
        .find({})
        .select("-logo")
        .select(" -second_logo")
        .lean();
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async findById(id: string): Promise<Setting | any> {
    try {
      return await this.settingModel
        .findById(id)
        .select("-logo")
        .select(" -second_logo")
        .lean();
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseService } from "src/utils/base-services";
import { FiscalYear } from "./entities/fiscal.schema";

@Injectable()
export class FiscalService extends BaseService<FiscalYear> {
  constructor(
    @InjectModel(FiscalYear.name) protected leaveModel: Model<FiscalYear>
  ) {
    super(leaveModel);
  }
}

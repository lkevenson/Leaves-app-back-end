import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { FiscalYear } from "./entities/fiscal.schema";
import { BaseService } from "../utils/base-services";

@Injectable()
export class FiscalService extends BaseService<FiscalYear> {
  constructor(@InjectModel(FiscalYear.name) protected leaveModel: Model<FiscalYear>) {super(leaveModel);}
}

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Document } from "mongoose";
import { BaseSchema } from "../../utils/base-entity";

export type FiscalYearDocument = FiscalYear & Document;

export enum StatusFiscalYear {
  ENABLE = 1,
  DISABLE = 0,
}

@Schema({ timestamps: true, collection: "fiscalyear" })
export class FiscalYear extends BaseSchema {
  @Prop({ type: Number, required: true, minlength: 2, maxlength: 4 })
  @IsNumber()
  year: number;

  @Prop({ type: String, required: true })
  @IsString()
  fiscalStart: string;

  @Prop({ type: String, required: true })
  @IsString()
  fiscalEnd: string;

  @Prop({ enum: StatusFiscalYear, default: StatusFiscalYear.ENABLE })
  @IsEnum(() => StatusFiscalYear)
  status: StatusFiscalYear;
}

export const FiscalYearSchema = SchemaFactory.createForClass(FiscalYear);

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FiscalYear, FiscalYearSchema } from "./entities/fiscal.schema";
import { FiscalController } from "./fiscal.controller";
import { FiscalService } from "./fiscal.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FiscalYear.name, schema: FiscalYearSchema },
    ]),
  ],
  controllers: [FiscalController],
  providers: [FiscalService],
})
export class FiscalModule {}

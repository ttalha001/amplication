import { DSGResourceData } from "@amplication/code-gen-types";
import { IsBoolean, IsString, ValidateNested } from "class-validator";

export class Value {
  @IsString()
  buildId!: string;
  @IsString()
  resourceId!: string;
  @ValidateNested()
  dsgResourceData!: DSGResourceData;
}

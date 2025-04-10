import { PartialType } from "@nestjs/swagger";
import { CreateVisitOtpDto } from "./create-visit-otp.dto";

export class UpdateVisitOtpDto extends PartialType(CreateVisitOtpDto) {}

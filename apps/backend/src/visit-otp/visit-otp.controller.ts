import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "src/iam/auth/decorator/auth.decorator";
import { AuthType } from "src/iam/auth/enums/auth-type.enum";
import { CreateVisitOtpDto } from "./dto/create-visit-otp.dto";
import { VisitOtpService } from "./visit-otp.service";
import { VerifyVisitOtpDto } from "./dto/verify-visit-otp.dto";

@Auth(AuthType.None)
@Controller("visit-otp")
export class VisitOtpController {
  constructor(private readonly visitOtpService: VisitOtpService) {}

  @Post("send")
  sendOtp(@Body() createVisitOtpDto: CreateVisitOtpDto) {
    return this.visitOtpService.sendOtp(createVisitOtpDto);
  }

  @Post("verify")
  verifyOtp(@Body() verifyVisitOtpDto: VerifyVisitOtpDto) {
    return this.visitOtpService.verifyOtp(verifyVisitOtpDto);
  }
}

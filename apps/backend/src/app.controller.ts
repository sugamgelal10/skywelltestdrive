import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthType } from './iam/auth/enums/auth-type.enum';
import { Auth } from './iam/auth/decorator/auth.decorator';

@Auth(AuthType.None)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUserData } from '../interface/active-user-data.interface';
import { AuthService } from './auth.service';
import { ActiveUser } from './decorator/active-user.decorator';
import { Auth } from './decorator/auth.decorator';
import { RefreshTokenDto, TokenResponseDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  UpdatePasswordResponseDto,
  UpdatePasswordDto,
} from './dto/update-password.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthType } from './enums/auth-type.enum';
import { User, UserRole } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../authorization/decorators/roles.decorator';
import { BaseQuery } from 'src/dto/baseQuery.dto';
import { PaginatedDto } from 'src/dto/pageReturn';

@ApiTags('Auth')
@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(FileInterceptor('profilePicture'))
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR)
  @Post('signup')
  signup(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ): Promise<User> {
    return this.authService.signup(signUpDto, profilePicture);
  }

  @Post('signin')
  signin(@Body() signInDto: SignInDto): Promise<TokenResponseDto> {
    return this.authService.signin(signInDto);
  }

  @Auth(AuthType.Bearer)
  @Post('refresh-token')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @ApiBearerAuth()
  @Auth(AuthType.Bearer)
  @Get('me')
  me(@ActiveUser() loggedInUser: ActiveUserData) {
    return this.authService.getMe(loggedInUser);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.Bearer)
  @Post('updatepassword')
  forgetPassword(
    @ActiveUser() loggedInUser: ActiveUserData,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdatePasswordResponseDto> {
    return this.authService.updatePassword(loggedInUser, updatePasswordDto);
  }

  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR)
  @UseInterceptors(FileInterceptor('profilePicture'))
  @Patch('user/:userId')
  update(
    @Body() userUpdateDto: UserUpdateDto,
    @Param('userId') userId: string,
    @UploadedFile() profilePicture: Express.Multer.File,
  ): Promise<User> {
    return this.authService.update(userUpdateDto, +userId, profilePicture);
  }

  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR)
  @Get('users')
  async getAllUser(@Query() queries: BaseQuery): Promise<PaginatedDto<User>> {
    return this.authService.getAllUser(queries);
  }

  @Roles(UserRole.COMPANY_ADMIN, UserRole.SUPER_ADMIN, UserRole.HR)
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR)
  @Delete('user/:id')
  async remove(@Param('id') id: string) {
    await this.authService.remove(+id);
  }
}

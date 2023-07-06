import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  async findAll() {
    return [];
  }
}

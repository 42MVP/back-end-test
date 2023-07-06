import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userName: string, password: string): Promise<any> {
    console.log(userName, password);
    const user = await this.authService.validateUser(userName, password);
    if (!user) {
      throw new UnauthorizedException('패스워드가 일치하지 않습니다!');
    }
    return user;
  }
}

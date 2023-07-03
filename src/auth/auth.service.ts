import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.intraId, userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

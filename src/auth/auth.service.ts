import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(userName: string, pass: string): Promise<any> {
    console.log(userName, pass);
    const user = await this.userService.findOneByUserName(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException('패스워드가 일치하지 않습니다!');
    }
    const payload = { sub: user.intraId, userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(userName);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    console.log('username: ', user.username);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

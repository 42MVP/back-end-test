import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly intraId: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAuth: boolean;

  @IsString()
  avatar: string;

  @IsString()
  email: string;
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './enums';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  intraId: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  isAuth: boolean;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserStatus })
  status: UserStatus;

  static from(createUserDto: CreateUserDto): User {
    const user = new User();
    user.intraId = createUserDto.intraId;
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    user.isAuth = createUserDto.isAuth;
    user.avatar = createUserDto.avatar;
    user.email = createUserDto.email;
    user.status = UserStatus.ONLINE;
    return user;
  }
}

import { Module, OnModuleInit } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRole } from 'src/interfaces/userrole';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { PhotoModule } from '../photo/photo.module';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
    imports:[UserModule, PhotoModule, ConfigModule, TokenModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule implements OnModuleInit{

  constructor(private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ){}

  async onModuleInit() {
    
    
    const hashedPassword = await this.tokenService.hash(this.configService.get<string>('admin.password'));

    await this.userService.registerAdmin({
      name: this.configService.get<string>('admin.name'),
      email: this.configService.get<string>('admin.email'),
      password: hashedPassword,
      role: UserRole.ADMIN,
    });
    console.log('Admin Registered!!');
  }
}

// import { Module, OnModuleInit } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';
// import { ConfigService } from '@nestjs/config';
// import { UserRole } from 'src/interfaces/userrole';
// import { UserService } from '../user/user.service';

// @Module({
//   controllers: [AdminController],
//   providers: [AdminService],
// })
// export class AdminModule implements OnModuleInit{

//   constructor(private readonly userService: UserService,
//     private readonly configService: ConfigService
//   ){}

//   async onModuleInit() {
    
//     await this.userService.registerAdmin({
//       name: this.configService.get<string>('admin.name'),
//       email: this.configService.get<string>('admin.email'),
//       password: this.configService.get<string>('admin.password'),
//       role: UserRole.ADMIN,
//     });


//     console.log('Admin Registered!!');


//   }



// }

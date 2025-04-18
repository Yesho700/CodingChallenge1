import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { CurrentUser } from './decorators/currentuser.decorator';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() userId: string){
    return this.userService.findUserById(userId);
  }
}



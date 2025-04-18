import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dtos/signup.dto';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() signUpData: SignUpDto){
    return this.authService.signUp(signUpData);
  }


  @Post('login')
  async login(@Body() credentials: LoginDto){
    return this.authService.login(credentials);
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from 'src/modules/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly tokenService: TokenService, private readonly reflector: Reflector){}
  async canActivate(
    context: ExecutionContext,
  ){


    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization?.split(' ')[1];

    if(!accessToken){
      throw new UnauthorizedException("Login Again");
    }

    const requiredRole = this.reflector.getAllAndOverride("role", [context.getHandler(), context.getClass()])

    try{
      const payload = await this.tokenService.verify(accessToken);
      request['userId'] = payload.userId;
      return requiredRole === payload.role;
    }catch(err){
      throw new UnauthorizedException("Invalid Credentials: Login Again!!!")
    }
    return true;
  }
}

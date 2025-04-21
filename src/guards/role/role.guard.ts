import { Role } from 'src/decorators/role.decorator';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const request = context.switchToHttp().getRequest();
    const requiredRole = this.reflector.getAllAndOverride<string[]>("role", [context.getHandler(), context.getClass()])
    
    return requiredRole === request.role;
  }
}

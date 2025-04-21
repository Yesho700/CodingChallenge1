import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserRole } from 'src/interfaces/userrole';
import { Role } from 'src/decorators/role.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role/role.guard';

@ApiTags('User')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard, RoleGuard)
@Role(UserRole.USER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
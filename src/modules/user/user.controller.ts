import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserRole } from 'src/interfaces/userrole';
import { Role } from 'src/decorators/role.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
@Role(UserRole.USER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
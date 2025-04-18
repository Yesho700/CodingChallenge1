import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserRole } from 'src/interfaces/userrole';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}



  @Get('stats')
  @UseGuards(AuthGuard)
  @Role(UserRole.ADMIN)
  async getAllStats(){
    return this.adminService.getAllStats();
  }
}

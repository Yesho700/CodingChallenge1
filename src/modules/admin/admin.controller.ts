import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { UserRole } from 'src/interfaces/userrole';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role/role.guard';

@ApiTags('Admin')
@ApiBearerAuth('JWT')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @UseGuards(AuthGuard, RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get admin statistics' })
  @ApiResponse({ status: 200, description: 'Returns admin statistics' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async getAllStats() {
    return this.adminService.getAllStats();
  }
}
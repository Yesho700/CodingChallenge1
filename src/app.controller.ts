import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { CurrentUser } from './decorators/currentuser.decorator';
import { UserService } from './modules/user/user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('App') // Groups these endpoints under "App" in Swagger UI
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the welcome message' 
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth('JWT') // Indicates this endpoint requires JWT authentication
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the authenticated user profile' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - valid JWT token required' 
  })
  async getProfile(@CurrentUser() userId: number) {
    return this.userService.findUserById(userId);
  }
}
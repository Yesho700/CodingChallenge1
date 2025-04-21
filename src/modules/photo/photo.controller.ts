import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserRole } from 'src/interfaces/userrole';
import { Role } from 'src/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role/role.guard';

@ApiTags('Photos')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard, RoleGuard)
@Role(UserRole.USER)
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Photo upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        caption: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Photo uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body('caption') caption: string,
    @CurrentUser() userId: number,
  ) {
    if (file) {
      await this.photoService.uploadPhoto(userId, file, caption);
      return { message: 'Photo Uploaded successfully!!' };
    }
    return { message: 'Unable to Upload File' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all photos for current user' })
  @ApiResponse({ status: 200, description: 'Returns all photos' })
  async getAllPhotos(@CurrentUser() userId: number) {
    return this.photoService.getAllPhotos(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific photo' })
  @ApiParam({ name: 'id', type: 'number', description: 'Photo ID' })
  @ApiResponse({ status: 200, description: 'Returns the photo' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  async getPhoto(@Param('id') id: number) {
    return this.photoService.getPhoto(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a photo' })
  @ApiParam({ name: 'id', type: 'number', description: 'Photo ID' })
  @ApiResponse({ status: 200, description: 'Photo deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not your photo' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  async photoDelete(@Param('id') id: number, @CurrentUser() userId: number) {
    return this.photoService.photoDelete(id, userId);
  }
}
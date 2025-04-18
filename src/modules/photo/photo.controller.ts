import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserRole } from 'src/interfaces/userrole';
import { Role } from 'src/decorators/role.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorators/currentuser.decorator';



@UseGuards(AuthGuard)
@Role(UserRole.USER)
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}



  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Body('caption') caption: string, @CurrentUser() userId: number){
    if(file)
      return this.photoService.uploadPhoto(userId, file, caption);
  }


  @Get()
  async getAllPhotos(@CurrentUser() userId: number){
    return this.photoService.getAllPhotos(userId);
  }


  @Get(':id')
  async getPhoto(@Param('id') id: number){
    return this.photoService.getPhoto(id);
  }

  @Delete(':id')
  async photoDelete(@Param('id') id: number, @CurrentUser() userId: number){
    return this.photoService.photoDelete(id, userId);
  }
}

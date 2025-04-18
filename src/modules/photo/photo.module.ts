import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from 'src/models/photo.model';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports:[
    TokenModule,
    CloudinaryModule,
    SequelizeModule.forFeature([Photo]),
    UserModule,
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports:[PhotoService]
})
export class PhotoModule {}

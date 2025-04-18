import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    MulterModule,
    ConfigModule],
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: (configService: ConfigService) => {
        return cloudinary.config({
          cloud_name: configService.get<string>('cloudinary.name'),
          api_key: configService.get<string>('cloudinary.apiKey'),
          api_secret: configService.get<string>('cloudinary.apiSecret'),
        });
      },
      inject: [ConfigService],
    },
    CloudinaryService,
  ],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
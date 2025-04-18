import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Photo } from './models/photo.model';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { PhotoModule } from './modules/photo/photo.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      load:[configuration]
    }),

    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [User, Photo],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TokenModule,
    UserModule,
    PhotoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

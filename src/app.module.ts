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
import { AdminModule } from './modules/admin/admin.module';

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
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.name'),
        models: [User, Photo],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TokenModule,
    UserModule,
    PhotoModule,
    AuthModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

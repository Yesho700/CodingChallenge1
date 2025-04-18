import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PhotoService } from '../photo/photo.service';

@Injectable()
export class AdminService {


    constructor(
        private readonly userService: UserService,
        private readonly photoService: PhotoService){}

    async getAllStats(){

        const data1 = await this.userService.getAllStats();
        const data2 = await this.photoService.getPhotoWithMaxSize();
        return {data1, data2};
    }
}

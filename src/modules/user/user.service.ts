import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { User } from 'src/models/user.model';


@Injectable()
export class UserService {


    constructor(@InjectModel(User) private UserModel: typeof User){}

    // async registerAdmin(data: any){
    //     return await this.
    // }

    async createUser(singupData: any){
        return await this.UserModel.create(singupData);
    }

    async findUserByEmail(email: string){
        return await this.UserModel.findOne({where: {email: email}, attributes:['id', 'password']});
    }

    async findUserById(id: string){
        return await this.UserModel.findByPk(id);
    }

    async getAllPhotos(userId: number){
        return await this.UserModel.findOne({where:{id:userId}, attributes:['photoIds']});
    }

   
    async updateUserPhoto(userId: number, photoId: number){
        return await this.UserModel.update(
            {photoIds: sequelize.fn('array_append', sequelize.col('photoIds'), photoId)},
            {where:{id:userId}}
        )
    }

    async photoDelete(photoId: number, userId: number){
        return await this.UserModel.update(
            {photoIds: sequelize.fn('array_remove', sequelize.col('photoIds'), photoId)},
            {where:{id:userId}}
        )
    }
}

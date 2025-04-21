import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { User } from 'src/models/user.model';


@Injectable()
export class UserService {


    constructor(@InjectModel(User) private UserModel: typeof User){}

    async registerAdmin(data: any){
        const check = await this.UserModel.findOne({where:{email:data.email}})
        if(!check)
            return await this.UserModel.create(data);
    }

    async createUser(singupData: any){
        return await this.UserModel.create(singupData);
    }

    async findUserByEmail(email: string){
        return await this.UserModel.findOne({where: {email: email}, attributes:['id', 'password', 'role']});
    }

    async findUserById(id: number){
        return await this.UserModel.findByPk(id,{attributes: ['name', 'id', 'role', 'photoIds']});
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

    async getUserWithMaxPhotos() {
        return this.UserModel.findOne({
          attributes: [
            'id',
            'name',
            [sequelize.fn('array_length', sequelize.col('photoIds'), 0), 'photoCount']
          ],
          order: [[sequelize.literal('"photoCount"'), 'DESC']] // Note the quotes
        });
      }

      async getPhotoCounts() {
        return this.UserModel.findAll({
          attributes: [
            'id',
            'name',
            [sequelize.fn('array_length', sequelize.col('photoIds'), 0), 'photoCount']
          ],
          order: [[sequelize.literal('photoCount'), 'DESC']]
        });
      }

    async getAllStats(){
        const photoCount = await this.getUserWithMaxPhotos();
        const userWithMaxPhotos = await this.getUserWithMaxPhotos();
      
        return {photoCount, userWithMaxPhotos}
    }
}

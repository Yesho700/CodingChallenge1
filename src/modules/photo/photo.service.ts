import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Photo } from 'src/models/photo.model';
import { InjectModel } from '@nestjs/sequelize';
import PhotoInter from 'src/interfaces/photo.interface';
import { Op } from 'sequelize';



@Injectable()
export class PhotoService {


    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly userService: UserService,
        @InjectModel(Photo) private PhotoModel: typeof Photo
    ){}


    async uploadPhoto(userId: number, file: Express.Multer.File, caption: string){
        // upload the Data to Cloudinary
        let result = await this.cloudinaryService.uploadPhoto(file, {imagemage_metadata: true, folder: 'snapify'});
        //Update the Photo Database with Meta Data and user Schema
      
        if (!result) {
            throw new Error('Cloudinary upload failed');
          }
          
          const data = await this.PhotoModel.create({
              publicId: result.public_id,
              url: result.secure_url,
              caption,
              userId,
              size:result.bytes,
              width: result.width,
              height: result.height,
              format: result.format
          });

        this.userService.updateUserPhoto(userId, data.id);
    }


    async getAllPhotos(userId: number){
        const photoIds:any = await this.userService.getAllPhotos(userId);
        console.log(photoIds.dataValues.photoIds);
        return await this.PhotoModel.findAll({
                where: {
                  id:photoIds.dataValues.photoIds,
                },
                  attributes: ['id', 'url'] 
            })
    }

    async getPhoto(id: number){
        return await this.PhotoModel.findOne({where:{id:id}})
    }


    async photoDelete(photoId: number, userId: number){
        await this.PhotoModel.destroy({
            where:{id:photoId}
        })

        return await this.userService.photoDelete(photoId, userId);
    }

    async getPhotoWithMaxSize() {
        return this.PhotoModel.findOne({
          attributes: ['url', 'size'],
          order: [['size', 'DESC']],
          raw: true
        });
      }
}


    


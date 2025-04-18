import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {

    async uploadPhoto(file: Express.Multer.File, options?: Record<string, any>): Promise<UploadApiResponse | UploadApiErrorResponse>{
        return new Promise( (resolve, reject) => {
            const uploadStream = v2.uploader.upload( file.path,
                { folder: "snapify", ...options},

                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if(error) return reject({error, message:"Hello"});
                    else if(result) return resolve(result);
                    else return reject("Cloduinary upload returns undefined")
                }
            );

        });
    }


    async getImageInfo(publicId: string) {
        return v2.api.resource(publicId, {
          image_metadata: true
        });
    }

    async getImageUrl(publicId: string, transformations?: any) {
        return v2.url(publicId, transformations);
    }

    async deleteImage(publicId: string) {
        return v2.uploader.destroy(publicId);
    }

}



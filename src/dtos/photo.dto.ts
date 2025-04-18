import { IsAlphanumeric, IsNotEmptyObject, MinLength } from "class-validator";


export class PhotoDto{

    @IsNotEmptyObject()
    file: Express.Multer.File;

    @IsAlphanumeric()
    @MinLength(2)
    caption: string;
}
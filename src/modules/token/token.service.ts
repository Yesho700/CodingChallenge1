import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TokenService {

    constructor(private readonly jwtService: JwtService){}

    async hash(data: any){
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(data, salt);
    }


    async compare(data1: any, data2: any){
        return await bcrypt.compare(data1, data2)
    }


    async sign(payload: any){
        return await this.jwtService.sign(payload);
    }


    async verify(accessToken: string){
        try{
        return await this.jwtService.verifyAsync(accessToken);
        }catch(err){
            throw new UnauthorizedException("Invalid Credentials : Login Again!!!")
        }
    }
}

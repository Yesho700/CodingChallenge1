import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address',
        required: true
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'User password (min 8 characters)',
        minLength: 8,
        required: true
    })
    @IsString()
    @MinLength(8)
    password: string;
}
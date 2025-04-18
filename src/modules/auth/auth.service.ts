import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { SignUpDto } from 'src/dtos/signup.dto';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/interfaces/userrole';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly tokenService: TokenService
    ){}

    async signUp(signupData: SignUpDto){
        const {email, password} = signupData;

        //Check the Existence

        const user = await this.userService.findUserByEmail(email);
        console.log(user)
        if(user)
            throw new UnauthorizedException({message:"User Alredy exists!!"});

        // Hash the password

        const hashedPassword = await this.tokenService.hash(password);
        // Defining Role
        const role = UserRole.USER;
        // Saving the user into Database 
        return this.userService.createUser({...signupData, password: hashedPassword, role});
    }


    async login(credentials: LoginDto){
        const { email, password } = credentials;
        //check the existence of User

        const user = await this.userService.findUserByEmail(email);
        console.log(user)
        if(!user){
            throw new NotFoundException("Invalid Credentials");
        }

        // checking the password

        const isValid = await this.tokenService.compare(password, user.dataValues.password);

        if(!isValid){
            throw new UnauthorizedException("Invalid Credentials");
        }

        const payload = {userId: user.id, role: UserRole.USER};

        // generate accessToken

        const accessToken = await this.tokenService.sign(payload);
        return {accessToken};

    }
}

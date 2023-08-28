import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entites/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayLoad } from './dtos/loginpayLoad.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly useService: UserService,
        private jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.useService
            .findUserByEmail(loginDto.email)
            .catch(() => undefined)

        const isMatch = await compare(loginDto.password, user?.password || '')

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid')
        }
        return {
            acessToken: this.jwtService.sign({ ...new LoginPayLoad(user) }),
            user: new ReturnUserDto(user)
        }
    }
}

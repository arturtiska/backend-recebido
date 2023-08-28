import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) { }

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.AuthService.login(loginDto))
    }
}

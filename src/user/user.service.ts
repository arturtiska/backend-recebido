import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltorRounds = 10
        const passowordHashed = await hash(createUserDto.password, saltorRounds)
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passowordHashed
        })
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }
}

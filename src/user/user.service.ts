import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entites/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/use-type.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDto.email)
            .catch(() => undefined)

        if (user) {
            throw new BadGatewayException('email registered in sytem')
        }


        const saltorRounds = 10
        const passowordHashed = await hash(createUserDto.password, saltorRounds)
        return this.userRepository.save({
            ...createUserDto,
            typeUser: UserType.User,
            password: passowordHashed
        })
    }

    async getAllByUsingRelations(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            }
        })
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
        })
        if (!user) {
            throw new NotFoundException(`UserId: ${userId} Not Found`)
        }
        return user
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        })
        if (!user) {
            throw new NotFoundException(`Email: ${email} Not Found`)
        }
        return user
    }
}

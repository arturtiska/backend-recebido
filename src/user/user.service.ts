import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entites/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/use-type.enum';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { createPasswordhashed, validatePassword } from 'src/utils/password';

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

        const passowordHashed = await createPasswordhashed(createUserDto.password);
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

    async updatePasswordUser(updatePassword: UpdatePasswordDto, userId: number): Promise<UserEntity> {
        const user = await this.findUserById(userId)
        const passowordHashed = await createPasswordhashed(updatePassword.newPassword)

        const isMatch = await validatePassword(updatePassword.lastPassword, user.password || '')


        if (!isMatch) {
            throw new BadRequestException('Last password invalid')
        }

        return this.userRepository.save({
            ...user,
            password: passowordHashed
        })
    }
}

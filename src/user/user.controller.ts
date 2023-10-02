import { Body, Controller, Post, Patch, Get, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entites/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from 'src/decorators/user-id-decorator';


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser)
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map((userEntity) => new ReturnUserDto(userEntity))
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getAllByUsingRelations(userId))
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(@UserId() userId: number, @Body() updatePassword: UpdatePasswordDto): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePassword, userId)
  }
}

import { UserEntity } from "../entites/user.entity";
import { UserType } from "../enum/use-type.enum";

export const userEntityMock: UserEntity = {
    cpf: '11111111',
    createdAt: new Date(),
    email: "email@hotmail.com",
    id: 50,
    name: 'nameFake',
    password: '00000000',
    phone: '3434343434',
    typeUser: UserType.User,
    updatedAt: new Date(),
}
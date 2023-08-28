import { UserEntity } from "src/user/entites/user.entity";

export class LoginPayLoad {
    id: number;
    typeUser: number

    constructor(user: UserEntity) {
        this.id = user.id
        this.typeUser = user.typeUser
    }
}
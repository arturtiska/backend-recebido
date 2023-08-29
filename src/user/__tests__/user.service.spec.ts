import { TestingModule, Test } from "@nestjs/testing"
import { UserService } from "../user.service"
import { UserEntity } from "../entites/user.entity"
import { Repository } from "typeorm"
import { getRepositoryToken } from "@nestjs/typeorm"
import { userEntityMock } from "../__mock__/user.mock"
import { createUserMock } from "../__mock__/createUser.mock"

describe('UserService', () => {
    let service: UserService
    let useRepository: Repository<UserEntity>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(userEntityMock),
                        save: jest.fn().mockResolvedValue(userEntityMock)
                    }
                }
            ]
        }).compile()
        service = module.get<UserService>(UserService)
        useRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    });
    it('should be defined', () => {
        expect(service).toBeDefined()
        expect(useRepository).toBeDefined()
    });

    it('should return user in findUserByEmail', async () => {
        const user = await service.findUserByEmail(userEntityMock.email)

        expect(user).toEqual(userEntityMock)
    });

    it('should return error in findUserByEmail', async () => {
        jest.spyOn(useRepository, 'findOne').mockResolvedValue(undefined)

        expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrowError()
    })

    it('should return user in findUserById', async () => {
        const user = await service.findUserById(userEntityMock.id)

        expect(user).toEqual(userEntityMock)
    });

    it('should return error in findUserById', async () => {
        jest.spyOn(useRepository, 'findOne').mockResolvedValue(undefined)

        expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrowError()
    })

    it('should return user in getAllByUsingRelations', async () => {
        const user = await service.getAllByUsingRelations(userEntityMock.id)

        expect(user).toEqual(userEntityMock)
    });

    it('should return error if user exist', async () => {

        expect(service.createUser(createUserMock)).rejects.toThrowError()
    })
    it('should return error if user not exist', async () => {
        jest.spyOn(useRepository, 'findOne').mockResolvedValue(undefined)

        const user = await service.createUser(createUserMock)

        expect(user).toEqual(userEntityMock)
    })
})
import { StateEntity } from "../entites/state.entity";

export class returnStateDto {
    name: string
    constructor(state: StateEntity) {
        this.name = state.name
    }
}
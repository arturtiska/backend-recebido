import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export class CartEntity {
    @PrimaryColumn('rowid')
    id: number

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updateAt: Date
}
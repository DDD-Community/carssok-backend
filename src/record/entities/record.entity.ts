import { Column, CreateDateColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Record {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    recordType: string

    @Column()
    isDeleteAt: boolean

    @Column()
    eventedAt: Date

    @Column()
    memo: string
    
    @CreateDateColumn()
    createdAt: Date 

    @UpdateDateColumn()
    updateAt: Date


}

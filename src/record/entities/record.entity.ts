import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Record {
    @PrimaryGeneratedColumn()
    id: number

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

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'user_id',
    })
    user: User


}

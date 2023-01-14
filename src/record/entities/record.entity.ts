import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Record {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    eventedAt: Date

    @Column()
    memo: string
    
    @CreateDateColumn()
    createdAt: Date 

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date

    @ManyToOne(() => User, { lazy: true })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'user_id',
    })
    user: User


}

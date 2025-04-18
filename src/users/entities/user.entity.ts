
import { Housing } from '../../housing/entities/housing.entity';


import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne} from 'typeorm'


@Entity({name : 'users'})
export class Users {
    
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({name: 'username', nullable:false, default: `x`})
    username: string;

    @Column({name:'email', nullable:false, unique:true})
    email: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({name: 'updated_at'})
    updateAt: string;

    @ManyToOne(() => Housing, (housing) => housing.residents, { onDelete: "SET NULL" })
    housing: Housing;
    bills: any;
    @ManyToOne(() => Users, (user) => user.bills, { eager: true, nullable: false })
    user: Users;
}

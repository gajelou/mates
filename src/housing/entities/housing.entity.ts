import { Users } from '../../users/entities/user.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Housing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  maxResidents: number;

  @OneToMany(() => Users , (user) => user.housing)
  residents: Users[];
}


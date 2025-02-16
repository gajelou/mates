import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Users } from "src/users/entities/user.entity";

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

  @OneToMany(() => Users, (user) => user.housing)
  residents: Users[];
}


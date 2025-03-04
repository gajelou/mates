import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Housing } from '../../housing/entities/housing.entity';
import { Users } from '../../users/entities/user.entity';

@Entity({name:'bills'})
export class Bills {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column()
  dueDate: string;

  @ManyToOne(() => Housing, (housing) => housing.bills)
  housing: Housing;

  @ManyToOne(() => Users, (user) => user.bills)
  user: Users;
}


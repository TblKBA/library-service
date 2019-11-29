import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class Readers {
  @PrimaryGeneratedColumn({ unsigned: true })
  readTicket: number;

  @Column({ type: 'int', default: null})
  id: number;
}

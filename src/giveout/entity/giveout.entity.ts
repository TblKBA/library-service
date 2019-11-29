import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['idBook'])
export class Giveout {
  @PrimaryGeneratedColumn({ unsigned: true })
  idGiveOut: number;

  @Column({ type: 'int', default: null})
  idBook: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  readonly dateGiveOut: number;

  @Column({ type: 'timestamp', default: null, nullable: true })
  dateReturn: number;

  @Column({ type: 'int', default: null})
  readTicket: number;
}

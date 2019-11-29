import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export const MAX_NAME_LENGTH: number = 255;
export const MAX_AUTHOR_LENGTH: number = 255;

@Entity()
@Unique(['name'])
export class Books {
  @PrimaryGeneratedColumn({ unsigned: true })
  idBook: number;

  @Column({ type: 'varchar', length:MAX_NAME_LENGTH , nullable: false })
  name: string;

  @Column({ type: 'varchar', length:MAX_AUTHOR_LENGTH , nullable: false })
  author: string;

  @Column({ type: 'date', default: null })
  year: Date;

  @Column({ type: 'int', default: null})
  amount: number;

}

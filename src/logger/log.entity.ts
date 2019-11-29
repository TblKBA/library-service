import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

@Entity()
export class Log {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', nullable: false, default: 'unknown path' })
  path: string;

  @Column({ type: 'enum', nullable: false, enum: HTTPMethod })
  method: string;

  @Column({ type: 'json', nullable: true })
  reqBody: object;

  @Column({ type: 'json', nullable: true })
  reqHeaders: object;

  @Column({ type: 'json', nullable: true })
  resHeaders: object;

  @Column({ type: 'json', nullable: true })
  resBody: object;

  @Column({ type: 'varchar', nullable: false })
  status: number;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  readonly date: Date;

  /*  @Column({ type: 'varchar', nullable: false })
    source: string;*/
}

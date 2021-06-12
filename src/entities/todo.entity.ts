import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoComplete {
  No = 0,
  Yes = 1,
}

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  user?: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 400,
  })
  contents: string;

  @Column({
    type: 'tinyint',
    default: TodoComplete.No,
  })
  complete: number;

  @Column({
    type: 'datetime',
  })
  startedAt: Date;

  @Column({
    type: 'datetime',
  })
  endedAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

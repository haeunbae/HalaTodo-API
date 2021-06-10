import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('increment', {
    type: 'number',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar2',
    length: 20,
  })
  user: string;

  @Column({
    type: 'varchar2',
    length: 45,
  })
  title: string;

  @Column({
    type: 'varchar2',
    length: 200,
  })
  contents: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  complete: boolean;

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
    default: Date.now(),
  })
  createdAt: Date;
}

import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./courses.entity";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, course => course.tags)
  courses: Course[]

  @CreateDateColumn({ name: 'created_at' }) // Automaticamente preenchido com a data de criação
  created_at: Date;
  
  @UpdateDateColumn({ name: 'updated_at' }) // Automaticamente preenchido com a data de atualização
  updated_at: Date;
}
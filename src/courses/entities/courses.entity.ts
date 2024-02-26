import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tag } from "./tags.entity";

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @JoinTable({
    name: 'courses_tags',
    joinColumn: {
      name: 'courseId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })  @ManyToMany(() => Tag, tag => tag.courses, {
    cascade: true
  })
  tags: Tag[];
  
  @Column()
  is_active: boolean;
  
  @Column({ type: 'float'})
  price: number;
  
  @Column()
  duration_in_hours: number;
  
  @Column()
  difficulty_level: string;
  
  @CreateDateColumn({ name: 'created_at' }) // Automaticamente preenchido com a data de criação
  created_at: Date;
  
  @UpdateDateColumn({ name: 'updated_at' }) // Automaticamente preenchido com a data de atualização
  updated_at: Date;
}

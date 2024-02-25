import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @Column('json', { nullable: true })
  tags: string[];
  
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

export class Course {
  id: number;
  name: string;
  description: string;
  tags: string[];
  is_active: boolean;
  price: number;
  duration_in_hours: number;
  difficulty_level: string;
  created_at: Date;
  updated_at: Date;
}

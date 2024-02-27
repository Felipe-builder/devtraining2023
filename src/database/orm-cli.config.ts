import 'dotenv/config';
import { CreateCoursesTable1708966105519 } from 'src/migrations/1708966105519-CreateCoursesTable';
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateTagsTable1708967084707 } from 'src/migrations/1708967084707-CreateTagsTable';
import { CreateCoursesTagsTable1708967651399 } from 'src/migrations/1708967651399-CreateCoursesTagsTable';
import { Tag } from 'src/courses/entities/tags.entity';
import { Course } from 'src/courses/entities/courses.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1708966105519, CreateTagsTable1708967084707, CreateCoursesTagsTable1708967651399],
})
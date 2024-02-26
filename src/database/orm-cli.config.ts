import { CreateCoursesTable1708966105519 } from 'src/migrations/1708966105519-CreateCoursesTable';
import { dataSourceOptions } from './database.module';
import { DataSource } from "typeorm";
import { CreateTagsTable1708967084707 } from 'src/migrations/1708967084707-CreateTagsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1708966105519, CreateTagsTable1708967084707],
})
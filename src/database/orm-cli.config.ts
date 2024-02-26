import { CreateCoursesTable1708966105519 } from 'src/migrations/1708966105519-CreateCoursesTable';
import { dataSourceOptions } from './database.module';
import { DataSource } from "typeorm";
import { CreateTagsTable1708967084707 } from 'src/migrations/1708967084707-CreateTagsTable';
import { CreateCoursesTagsTable1708967651399 } from 'src/migrations/1708967651399-CreateCoursesTagsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1708966105519, CreateTagsTable1708967084707, CreateCoursesTagsTable1708967651399],
})
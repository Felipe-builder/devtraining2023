import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';
import { DataSourceOptions } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      {
        useFactory: async (configService: ConfigService) => {
          return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: Number(configService.get('DB_PORT')),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [Course, Tag],
            synchronize: false
          }
        },
        inject: [ConfigService]
      }
    )
  ]
})
export class DatabaseModule {

}

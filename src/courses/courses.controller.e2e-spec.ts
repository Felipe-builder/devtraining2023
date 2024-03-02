import { CoursesModule } from './courses.module';
import 'dotenv/config'

import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from './entities/tags.entity';
import { Course } from './entities/courses.entity';
import { CoursesController } from './courses.controller';

describe('CoursesController e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let updateData: any;
  let courses: Course[];
  let controller: CoursesController;

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true
  }


  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    data = {
      "name": "Desenvolvimento de Jogos com Unity",
      "description": "Aprenda a criar jogos incríveis com Unity",
      "tags": [
        "unity",
        "game development",
        "c#"
      ],
      "is_active": true,
      "price": 69.99,
      "duration_in_hours": 10,
      "difficulty_level": "intermediate"
    }
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(Course);
    courses = await repository.find();
    await dataSource.destroy()
  })

  afterAll(async () => {
    await module.close();
  })

  describe('POST /courses', () => {
    it('should create a course', async () => {
      const res = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201)

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
      expect(res.body.is_active).toEqual(data.is_active);
      expect(res.body.price).toEqual(data.price);
      expect(res.body.duration_in_hours).toEqual(data.duration_in_hours);
      expect(res.body.difficulty_level).toEqual(data.difficulty_level);
      expect(res.body.created_at).toBeDefined();
      expect(res.body.updated_at).toBeDefined();
      expect(res.body.tags[0].name).toEqual(data.tags[0]);
      expect(res.body.tags[1].name).toEqual(data.tags[1]);
      expect(res.body.tags[2].name).toEqual(data.tags[2]);
    });
  });

  describe('GET /courses', () => {
    it('should list courses', async () => {
      const res = await request(app.getHttpServer())
        .get('/courses')
        .expect(200)

      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].description).toEqual(data.description);
      expect(res.body[0].is_active).toEqual(data.is_active);
      expect(res.body[0].price).toEqual(data.price);
      expect(res.body[0].duration_in_hours).toEqual(data.duration_in_hours);
      expect(res.body[0].difficulty_level).toEqual(data.difficulty_level);
      expect(res.body[0].created_at).toBeDefined();
      expect(res.body[0].updated_at).toBeDefined();

      res.body.map(item =>
        expect(item).toEqual({
          id: item.id,
          name: item.name,
          description: item.description,
          is_active: item.is_active,
          price: item.price,
          duration_in_hours: item.duration_in_hours,
          difficulty_level: item.difficulty_level,
          created_at: item.created_at,
          updated_at: item.updated_at,
          tags: [...item.tags],
        }))
    });

  });

  describe('GET /courses/:id', () => {
    it('should get a course by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/courses/${courses[0].id}`)
        .expect(200)

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(courses[0].name);
      expect(res.body.description).toEqual(courses[0].description);
      expect(res.body.is_active).toEqual(courses[0].is_active);
      expect(res.body.price).toEqual(courses[0].price);
      expect(res.body.duration_in_hours).toEqual(courses[0].duration_in_hours);
      expect(res.body.difficulty_level).toEqual(courses[0].difficulty_level);
      expect(res.body.created_at).toBeDefined();
      expect(res.body.updated_at).toBeDefined();
    });
  });

  describe('PUT /courses/:id', () => {
    it('should update a course by id', async () => {

      updateData = {
        "name": "Desenvolvimento Mobile com Flutter",
        "description": "Aprenda a criar aplicativos móveis multiplataforma com Flutter",
        "tags": ["flutter", "dart", "mobile development"],
        "is_active": true,
        "price": 59.99,
        "duration_in_hours": 10,
        "difficulty_level": "intermediate",
      }

      const res = await request(app.getHttpServer())
        .put(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200)

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual("Desenvolvimento Mobile com Flutter");
      expect(res.body.description).toEqual("Aprenda a criar aplicativos móveis multiplataforma com Flutter");
      expect(res.body.is_active).toEqual(true);
      expect(res.body.price).toEqual(59.99);
      expect(res.body.duration_in_hours).toEqual(10);
      expect(res.body.difficulty_level).toEqual("intermediate");
      expect(res.body.tags[0].name).toEqual("flutter");
      expect(res.body.created_at).toBeDefined();
      expect(res.body.updated_at).toBeDefined();
    });
  });

  describe('DELETE /courses/:id', () => {
    it('should delete a course by id', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(204)
        .expect({})
    });
  });


});

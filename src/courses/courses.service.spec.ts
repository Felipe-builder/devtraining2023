import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { Tag } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateCourseDTO } from './dto/create-course.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let updated_at: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    updated_at = new Date();
    expectOutputTags = [
      {
        id,
        "name": "unity",
        created_at,
        updated_at
      }
    ]

    expectOutputCourses = {
      id,
      name: "Desenvolvimento de Jogos com Unity",
      description: "Aprenda a criar jogos incríveis com Unity",
      is_active: true,
      price: 69.99,
      duration_in_hours: 10,
      difficulty_level: "intermediate",
      tags: expectOutputTags,
      created_at,
      updated_at,
    }

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a course', async () => {
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const createCourseDTO: CreateCourseDTO = {
        name: "Desenvolvimento de Jogos com Unity",
        description: "Aprenda a criar jogos incríveis com Unity",
        is_active: true,
        price: 69.99,
        duration_in_hours: 10,
        difficulty_level: "intermediate",
        tags: ['unity'],
      }

      const newCourse = await service.create(createCourseDTO);

      expect(mockCourseRepository.save).toHaveBeenCalled();
      expect(expectOutputCourses).toStrictEqual(newCourse);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const courses = await service.findAll();

      expect(mockCourseRepository.find).toHaveBeenCalled();

      expect(expectOutputCourses).toStrictEqual(courses);
    });
  });

  describe('findOne', () => {
    it('should return a course by id', async () => {
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const course = await service.findOne(id);

      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(expectOutputCourses).toStrictEqual(course);
    });

    it('should throw NotFoundException if course not found', async () => {
      //@ts-expect-error defined part of methods
      service['courseRepository'] = {
        findOne: jest.fn().mockResolvedValue(undefined), // Simulando um curso não encontrado
      };
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const courseId = '1';
      await expect(service.findOne(courseId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const updateCourseDTO: UpdateCourseDTO = {
        name: "Desenvolvimento de Jogos com Unity",
        description: "Aprenda a criar jogos incríveis com Unity",
        is_active: true,
        price: 69.99,
        duration_in_hours: 10,
        difficulty_level: "intermediate",
        tags: ['unity'],
      }

      const updateCourse = await service.update(id, updateCourseDTO);

      expect(mockCourseRepository.save).toHaveBeenCalled();
      expect(mockCourseRepository.preload).toHaveBeenCalled();
      expect(expectOutputCourses).toStrictEqual(updateCourse);
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;

      const courseDeleted = await service.delete(id);

      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(mockCourseRepository.remove).toHaveBeenCalled();
      expect(expectOutputCourses).toStrictEqual(courseDeleted);
    });
  });
});

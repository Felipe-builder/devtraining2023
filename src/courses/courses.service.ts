import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) { }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({relations: ['tags']})
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags']
    });
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const tags = await Promise.all(
      createCourseDTO.tags.map(name => this.preloadTagByName(name))
    )
    const courseCreated = this.courseRepository.create({
      ...createCourseDTO,
      tags
    });
    return this.courseRepository.save(courseCreated);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO): Promise<Course> {

    const tags = updateCourseDTO.tags && await Promise.all(
      updateCourseDTO.tags.map(name => this.preloadTagByName(name))
    )

    const course = await this.courseRepository.preload({ ...updateCourseDTO, id, tags })
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) throw new NotFoundException(`Course ID ${id} not found`);
    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({where: { name }})
    if (tag) return tag;
    return this.tagRepository.create({ name })
  }
}

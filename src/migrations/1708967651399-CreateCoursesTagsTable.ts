import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCoursesTagsTable1708967651399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'courses_tags',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'courseId',
                        type: 'uuid',
                    },
                    {
                        name: 'tagId',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()', 
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()', 
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        );

        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_courses',
                columnNames: ['courseId'],
                referencedTableName: 'courses',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'courses_tags',
            new TableForeignKey({
                name: 'courses_tags_tags',
                columnNames: ['tagId'],
                referencedTableName: 'tags',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_courses');
        await queryRunner.dropForeignKey('courses_tags', 'courses_tags_tags');
        await queryRunner.dropTable('courses_tags');    }

}

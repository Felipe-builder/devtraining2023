import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1708966105519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(
            new Table({
                name: 'courses',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        default: true, // Define o padrão como true
                    },
                    {
                        name: 'price',
                        type: 'float',
                    },
                    {
                        name: 'duration_in_hours',
                        type: 'int',
                    },
                    {
                        name: 'difficulty_level',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()', // Define o padrão como a data e hora atual
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()', // Define o padrão como a data e hora atual
                        onUpdate: 'CURRENT_TIMESTAMP', // Atualiza automaticamente a data e hora de atualização
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses');
    }

}

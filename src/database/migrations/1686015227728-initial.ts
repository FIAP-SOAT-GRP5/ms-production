/* v8 ignore start */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { getIntId } from '../utils/migration';

export class Initial1686015227728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          getIntId(),
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'finished_at',
            type: 'timestamp',
            isNullable: true,
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
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}

/* v8 ignore stop */

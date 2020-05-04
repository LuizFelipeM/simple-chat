import * as Knex from "knex";

const tableName = 'users';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table: Knex.CreateTableBuilder) => {
        table.bigIncrements('id').primary();
        table.string('name', 50).notNullable();
        table.string('email', 100).notNullable();
        table.text('password').notNullable();
        table.text('img_url');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(tableName);
}


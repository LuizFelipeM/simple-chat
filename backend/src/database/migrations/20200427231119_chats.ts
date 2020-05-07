import * as Knex from "knex";

const tableName = 'chats';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, (table: Knex.CreateTableBuilder) => {
        table.bigIncrements('id').primary();
        table.string('name', 30).notNullable();
        table.string('description', 50);
        table.text('img_url');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(tableName);
}


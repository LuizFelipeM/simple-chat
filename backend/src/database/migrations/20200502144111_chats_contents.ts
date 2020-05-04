import * as Knex from "knex";

const tableName = 'chats_contents';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, async (table: Knex.CreateTableBuilder) => {
        table.bigInteger('chat_id').notNullable().unique();
        table.jsonb('messages');

        table.foreign('chat_id').references('id').inTable('chats');
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(tableName);
}
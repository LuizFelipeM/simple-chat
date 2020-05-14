import * as Knex from "knex";

const tableName = 'chats_contents';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable(tableName, async (table: Knex.CreateTableBuilder) => {
        table.bigInteger('chat_id').notNullable();
        table.bigInteger('user_id').notNullable();
        table.string('message');
        table.timestamp('message_sent_at');
        table.timestamp('created_at', { precision: 6}).defaultTo(knex.fn.now(6));

        table.foreign('chat_id').references('id').inTable('chats').onDelete('CASCADE');
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable(tableName);
}
import { development, staging } from "../../knexfile";
import Knex from "knex";

// const config = process.env.NODE_ENV === 'dev' ? development : staging

const dbConnection = Knex(development);

export default dbConnection;
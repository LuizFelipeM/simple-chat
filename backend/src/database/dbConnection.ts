import { development, staging } from "../../knexfile";
import Knex from "knex";

// TODO - Desenvolver a separação entre dev, staging e prod
// const config = process.env.NODE_ENV === 'dev' ? development : staging

const knex = Knex(development);

export default knex;
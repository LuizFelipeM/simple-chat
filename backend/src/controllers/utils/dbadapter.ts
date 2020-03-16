import { Pool } from "pg"

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432
})

const dbAdapter = {
    async query(
        queryString:string,
        params:any[] = [],
        callback?:any
    ): Promise<any> {
        const response = await pool.query(queryString, params, callback)
        return response
    }
}

export default dbAdapter;
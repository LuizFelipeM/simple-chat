import { Pool } from "pg"
import { dbData } from '../../../secrets'

const pool = new Pool(dbData)

const dbAdapter = {
    async query(queryString:string, params:any[] = [], callback?:any): Promise<any>{
        const response = await pool.query(queryString, params, callback)
        return response
    }
}

export default dbAdapter;
import * as pg from 'pg';
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg.default;


const pool = new Pool({
  connectionString: `pgserver://postgres:${process.env.PG_PASSWORD}@localhost:5432/skill-checkpoint-2`,
});


export { pool };


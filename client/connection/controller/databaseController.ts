import { Request, RequestHandler,  Response, NextFunction} from 'express';
import { ServerError } from '../types';

import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});


export const queryDatabase: RequestHandler = async (req, res, next) {
    {dataBaseQuery} = req.body;
    try {
      const result = await pool.query(dataBaseQuery);
    } catch (error)
}
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';

import { intakeNaturalLanguageQuery } from './controller/naturalLanguageController.js';
import { convertToSQL } from './controller/openAIController.js';
import { queryDatabase } from './controller/databaseController.js';

import { ServerError } from './types.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.post(
    '/api',
    intakeNaturalLanguageQuery,
    convertToSQL,
    queryDatabase,
    (_req, res) => {
      res.status(200).json({
        databaseQuery: res.locals.databaseQuery,
        databaseQueryResult: res.locals.databaseQueryResult,
      });
    }

)

export default app;
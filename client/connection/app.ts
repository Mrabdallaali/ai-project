import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';

import { intakeNaturalLanguageQuery } from './controller/naturalLanguageController.js';
import { openAIQuery } from './controller/openAIController.js';
import { queryDatabase } from './controller/databaseController.js';

import { ServerError } from './types';

const app = express();

app.use(cors());
app.use(express.json());

app.post(
    '/api',
    intakeNaturalLanguageQuery,
    openAIQuery,
    queryDatabase,
    (_req, res) => {
      res.status(200).json({
        databaseQuery: res.locals.databaseQuery,
        databaseQueryResult: res.locals.databaseQueryResult,
      });

)
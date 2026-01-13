import { Request, RequestHandler, Response, NextFunction } from 'express';
import { ServerError } from '../types';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DB_SCHEMA = 'twitch_streamers';

// If you declare columns (headers of tables) as array, it will directly look for it (But ofc, adding it as a string still works)
const DB_COLUMN =  ['Channel', 'Watch_time_Minutes', 'Stream_time_minutes', 'Peak_viewers', 'Average_viewers', 'Followers', 'Followers_gained', 'Views_gained', 'Partnered', 'Mature', 'Language']

const INSTRUCTIONS = `
###Instructions###

You must generate a single valid SQL SELECT query using only the schema given.

HARD RULES (Must always follow):
1. SELECT-only. No INSERT/UPDATE/DELETE/DROP/ALTER/etc.
2. Use ONLY ${DB_COLUMN} from the schema.
3. Exactly ONE semicolon, only at the end of the query.

TEXT:
4. Use ILIKE for case-insensitive text matching.

`


const PROMPT = `
###Role###
You are a SQL expert. Convert natural language to SQL queries.

***Context***
<SCHEMA>
${DB_SCHEMA}
</SCHEMA>

***Rules***
${INSTRUCTIONS}

***Task***
Analyze provided question and generate:
1. the SQL query
2. a brief English explanation (max 250 characters)

The query must strictly follow the given rules.
`



export const convertToSQL: RequestHandler = async (req, res) => {
  try {
    const { question } = req.body; // User's natural language query

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'question is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        {
          role: 'user',
          content: question,
        },
      ],
    });

    const sqlQuery = completion.choices[0].message?.content?.trim();

    return res.json(JSON.parse(sqlQuery));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API call failed' });
  }
};

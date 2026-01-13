import { Request, RequestHandler, Response, NextFunction } from 'express';
import { ServerError } from '../types';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const convertToSQL: RequestHandler = async (req, res) => {
  try {
    const { query } = req.body; // User's natural language query

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a SQL expert. Convert natural language to SQL queries.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    const sqlQuery = completion.choices[0].message.content;

    res.json({ sqlQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API call failed' });
  }
};

import { Request, RequestHandler, Response, NextFunction } from "express";
import { ServerError } from "../types";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DB_SCHEMA = "twitch_streamers";

// If you declare columns (headers of tables) as array, it will directly look for it (But ofc, adding it as a string still works)
const DB_COLUMN = [
  "Channel",
  "Watch_time_Minutes",
  "Stream_time_minutes",
  "Peak_viewers",
  "Average_viewers",
  "Followers",
  "Followers_gained",
  "Views_gained",
  "Partnered",
  "Mature",
  "Language",
];

const PROMPT = `
###Role###
You are a SQL expert. Convert natural language to SQL queries.

***Context***
<SCHEMA>
${DB_SCHEMA}
</SCHEMA>

***Rules***
1. SELECT-only. No INSERT/UPDATE/DELETE/DROP/ALTER/etc.
2. Use ONLY these columns: ${DB_COLUMN}
3. No semicolons.
4. Use ILIKE for case-insensitive text matching.
5. Always query from the ${DB_SCHEMA} table.

***Task***
Return ONLY the raw SQL query. No explanation, no markdown, no numbering, no semicolons.
`;

export const convertToSQL: RequestHandler = async (req, res, next) => {
  try {
    const naturalLanguageQuery = res.locals.naturalLanguageQuery; // User's natural language query

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: PROMPT,
        },
        {
          role: "user",
          content: naturalLanguageQuery,
        },
      ],
    });

    const sqlQuery = completion.choices[0].message?.content?.trim();

    res.locals.databaseQuery = sqlQuery;
    return next(); // ✅ pass to databaseController
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "API call failed" });
  }
};

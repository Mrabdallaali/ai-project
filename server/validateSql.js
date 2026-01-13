// File: server/validateSql.js


const blocked = [
  "insert", "update", "delete", "drop", "alter", "truncate",
  "create", "grant", "revoke"
];

export function validateSql(sql) {
  if (!sql) return { ok: false, error: "Empty SQL" };

  const s = sql.trim().toLowerCase();

  // No multi-statement
  if (s.includes(";")) return { ok: false, error: "Semicolons are not allowed" };

  // Must be SELECT
  if (!s.startsWith("select")) return { ok: false, error: "Only SELECT queries are allowed" };

  // Block dangerous keywords
  for (const word of blocked) {
    if (s.includes(word)) return { ok: false, error: `Blocked keyword: ${word}` };
  }

  // Must query the allowed table
  if (!s.includes("from twitch_streamers")) {
    return { ok: false, error: "Only twitch_streamers table is allowed" };
  }

  // Enforce LIMIT
  if (!s.includes("limit")) {
    return { ok: true, sql: sql.trim() + " LIMIT 50" };
  }

  return { ok: true, sql: sql.trim() };
}

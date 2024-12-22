import db, { all, one, run } from "./utils";

export interface Apis {
  api: string;
  title?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const init = () => {
  db.run(/* SQL */ `DROP TABLE IF EXISTS apis`);
  db.run(/* SQL */ `
    CREATE TABLE apis (
      api TEXT PRIMARY KEY,
      title TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
};

export const get = async (api: string) => {
  return await one<Apis>("SELECT * FROM apis WHERE api = ?", api);
};

// List apis (excluding logically deleted ones)
export const list = async () => {
  return await all<Apis[]>("SELECT * FROM apis");
};

// Create a new api
export const create = async (input: Apis) => {
  return await run(
    "INSERT INTO apis (title, api) VALUES (?, ?)",
    input.title ?? null,
    input.api
  );
};

// Update api information
export const update = async (input: Apis) => {
  return await run(
    'UPDATE apis SET title = ?, updated_at = datetime("now") WHERE api = ?',
    input.title ?? null,
    input.api
  );
};

// Logically delete a api
export const remove = async (api: string) => {
  return await run("DELETE FROM apis WHERE api = ?", api);
};

import db, { all, one, run } from "./utils";

export interface Blobs {
  id: number;
  file_data: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at?: string;
  updated_at?: string;
}

export const init = async () => {
  db.run(/* SQL */ `DROP TABLE IF EXISTS blobs`);
  db.run(/* SQL */ `
    CREATE TABLE blobs (
      id INTEGER PRIMARY KEY,
      file_data BLOB NOT NULL,
      file_name TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      file_type TEXT NOT NULL CHECK(file_type IN ('image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf', 'text/html')),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
};

export const list = async () => {
  return await all<Blobs[]>("SELECT * FROM blobs");
};

export const get = async (id: number) => {
  return await one<Blobs>("SELECT * FROM blobs WHERE id = ? ", id);
};

// Upload blob data for a page
export const create = async (input: Omit<Blobs, "id">) => {
  return await run(
    "INSERT INTO blobs (file_data, file_name, file_size, file_type) VALUES (?, ?, ?, ?)",
    input.file_data,
    input.file_name,
    input.file_size,
    input.file_type,
  );
};

// Update blob data
export const update = async (input: Blobs) => {
  return await run(
    'UPDATE blobs SET file_data = ?, file_name = ?, file_size = ?, file_type = ?, updated_at = datetime("now") WHERE id = ?',
    input.file_data,
    input.file_name,
    input.file_size,
    input.file_type,
    input.id,
  );
};

// Permanently delete a blob
export const remove = async (id: number) => {
  return await run("DELETE FROM blobs WHERE id = ?", id);
};

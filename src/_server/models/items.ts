import db, { all, one, run } from "./utils";

export interface ContentItems {
  id: number;
  pathname?: string | null;
  blob_id?: number | null;
  form_id?: number | null;
  content?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const init = () => {
  db.run(/* SQL */ `DROP TABLE IF EXISTS items`);
  db.run(/* SQL */ `
    CREATE TABLE items (
      id INTEGER PRIMARY KEY,
      blob_id INTEGER DEFAULT NULL,
      form_id INTEGER DEFAULT NULL,
      content TEXT DEFAULT NULL,
      pathname TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (id) REFERENCES blobs(id),
      FOREIGN KEY (id) REFERENCES forms(id),
      FOREIGN KEY (id) REFERENCES pages(id)
    );
  `);
};

// Get text data from items
export const list = async () => {
  return await all<ContentItems[]>("SELECT * FROM items");
};

export const listByPathname = async (pathname: string) => {
  return await all<ContentItems[]>(
    "SELECT * FROM items WHERE pathname = ?",
    pathname,
  );
};

export const listByForm = async (form_id: number) => {
  return await all<ContentItems[]>(
    "SELECT * FROM items WHERE form_id = ?",
    form_id
  );
};

export const get = async (id: number) => {
  return await one<ContentItems>("SELECT * FROM items WHERE id = ?", id);
};

// Create items for the page
export const create = async (input: Omit<ContentItems, "id">) => {
  return await run(
    "INSERT INTO items (pathname, blob_id, form_id, content) VALUES (?, ?, ?, ?)",
    input.pathname ?? null,
    input.blob_id ?? null,
    input.form_id ?? null,
    input.content ?? null
  );
};

// Update a content_item
export const update = async (input: ContentItems) => {
  return await run(
    'UPDATE items SET blob_id = ?, form_id = ?, content = ?, updated_at = datetime("now") WHERE id = ?',
    input.blob_id ?? null,
    input.form_id ?? null,
    input.content ?? null,
    input.id
  );
};

// Logically delete a content_item
export const remove = async (id: number) => {
  return await run("DELETE FROM items WHERE id = ?", id);
};

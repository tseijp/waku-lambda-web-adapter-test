import { FormType } from "@/const";
import db, { all, one, run } from "./utils";

export interface Forms {
  id: number;
  api: string;
  form_name?: string | null;
  form_type?: FormType | null;
  form_title?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const init = () => {
  db.run(/* SQL */ `DROP TABLE IF EXISTS forms`);
  db.run(/* SQL */ `
    CREATE TABLE forms (
      id INTEGER PRIMARY KEY,
      api TEXT NOT NULL,
      form_name TEXT DEFAULT NULL,
      form_type TEXT DEFAULT NULL,
      form_title TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (api) REFERENCES apis(api)
    );
  `);
};

// Get text data from forms
export const list = async () => {
  return await all<Forms[]>("SELECT * FROM forms");
};

export const listByApi = async (api: string) => {
  return await all<Forms[]>("SELECT * FROM forms WHERE api = ?", api);
};

export const get = async (id: number) => {
  return await one<Forms>("SELECT * FROM forms WHERE id = ?", id);
};

// Create forms for the api
export const create = async (input: Omit<Forms, "id">) => {
  return await run(
    "INSERT INTO forms (api, form_name, form_type, form_title) VALUES (?, ?, ?, ?)",
    input.api,
    input.form_name ?? null,
    input.form_type ?? null,
    input.form_title ?? null
  );
};

// Update a content_item
export const update = async (input: Forms) => {
  return await run(
    'UPDATE forms SET api = ?, form_name = ?, form_type = ?, form_title = ?, updated_at = datetime("now") WHERE id = ?',
    input.api ?? null,
    input.form_name ?? null,
    input.form_type ?? null,
    input.form_title ?? null,
    input.id
  );
};

// Logically delete a content_item
export const remove = async (id: number) => {
  return await run("DELETE FROM forms WHERE id = ?", id);
};

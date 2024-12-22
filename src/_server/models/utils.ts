/**
 * ref
 * - https://stackoverflow.com/questions/64372255/how-to-use-async-await-in-sqlite3-db-get-and-db-all
 * - https://rodydavis.com/sqlite/nosql
 */
import { join } from "path";
import sqlite3 from "sqlite3";

// Create a file-based SQLite database
const db = new sqlite3.Database(join(process.cwd(), "./db.sqlite"));

export async function all<T, Args extends any[] = any[]>(
  query: string,
  ...args: Args
) {
  return new Promise<T>((resolve, reject) => {
    db.all(query, args, function (err, rows) {
      if (err) return reject(err);
      else resolve(rows as T);
    });
  });
}

export async function one<T, Args extends any[] = any[]>(
  query: string,
  ...args: Args
) {
  return new Promise<T>((resolve, reject) => {
    db.get(query, args, function (err, rows) {
      if (err) return reject(err);
      else resolve(rows as T);
    });
  });
}

export async function run<Args extends any[] = any[]>(
  query: string,
  ...args: Args
): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(query, args, function (err) {
      if (err) return reject(err);
      else resolve(this.lastID);
    });
  });
}

export default db;

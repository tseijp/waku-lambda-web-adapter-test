import * as apis from "./apis";
import * as blobs from "./blobs";
import * as forms from "./forms";
import * as items from "./items";
import * as pages from "./pages";
import db from "./utils";


export function initDb() {
  db.serialize(() => {
    apis.init();
    blobs.init();
    forms.init();
    items.init();
    pages.init();
  });
}

export default {
  apis,
  blobs,
  forms,
  items,
  pages,
};
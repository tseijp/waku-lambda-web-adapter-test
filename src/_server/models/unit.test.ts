import models, { initDb } from ".";
import { TEST_CSV } from "./test.csv";
import { beforeAll, describe, expect, it } from "@jest/globals";

interface ParsedCSV {
  code: string;
  pref: string;
  city: string;
  pref_kana: string;
  city_kana: string;
}

function* parseCSV() {
  const lines = TEST_CSV.split("\n");
  for (const line of lines) {
    // 団体コード,都道府県名（漢字）,市区町村名（漢字）,都道府県名（カナ）,市区町村名（カナ）
    const [code, pref, city, pref_kana, city_kana] = line.split(",");
    yield { code, pref, city, pref_kana, city_kana } as ParsedCSV;
  }
}

const DEFAULT_FORMS = [
  { form_name: "pref", form_title: "都道府県名（漢字）" },
  { form_name: "city", form_title: "市区町村名（漢字）" },
  { form_name: "pref_kana", form_title: "都道府県名（カナ）" },
  { form_name: "city_kana", form_title: "市区町村名（カナ）" },
];

const test_csv = parseCSV();

beforeAll(() => {
  initDb();
});

describe("Database Integration Tests", () => {
  it("create api and pages", async () => {
    let _item: ParsedCSV;
    let cache = { pref: 0, city: 0, pref_kana: 0, city_kana: 0 };
    for (const item of test_csv)
      if (!item.city) {
        // Create api, forms and root pages
        _item = item;
        const [pref, city, pref_kana, city_kana] = await Promise.all([
          ...DEFAULT_FORMS.map((form) =>
            models.forms.create({ api: item.code, ...form })
          ),
          models.apis.create({ api: item.code, title: item.pref }),
          models.pages.create({ pathname: item.code, title: item.pref }),
        ]);
        Object.assign(cache, { pref, city, pref_kana, city_kana });
      } else {
        // create pages and forms
        await Promise.all([
          models.pages.create({
            pathname: item.code,
            title: item.city ?? null,
            api: _item!.code,
          }),
          ...DEFAULT_FORMS.map(({ form_name }) =>
            models.items.create({
              pathname: item.code,
              form_id: (cache as any)[form_name], // ??
              content: (item as any)[form_name],
            })
          ),
        ]);
      }
  });

  /**
   * CRUD operations
   */
  it("CRUD operations on apis", async () => {
    // Create a new api
    const api = "test_api";
    await models.apis.create({ api });
    expect(await models.apis.get(api)).toBeDefined();

    // Update the api
    await models.apis.update({ api, title: "updated" });
    expect((await models.apis.get(api)).title).toBe("updated");

    // delete the api
    await models.apis.remove(api);
    expect(await models.apis.get(api)).toBeUndefined();
  });

  it("CRUD operations on blobs", async () => {
    // Create a blob
    let file_data = "image_data";
    const fileInput = {
      file_name: "image.jpg",
      file_type: "image/jpeg",
      file_size: 1024 * 1024,
    };

    // Create the blob
    const id = await models.blobs.create({ file_data, ...fileInput });
    expect(await models.blobs.get(id)).toBeDefined();

    // Update the blob
    file_data = "Updated";
    await models.blobs.update({ file_data, ...fileInput, id });
    expect((await models.blobs.get(id)).file_data).toBe("Updated");

    // Delete the blob
    await models.blobs.remove(id);
    expect(await models.blobs.get(id)).toBeUndefined();
  });

  it("CRUD operations on pages", async () => {
    // Create a page
    const pathname = "test_page";
    await models.pages.create({ pathname });
    expect(await models.pages.get(pathname)).toBeDefined();

    // Update the page
    await models.pages.update({ pathname, title: "Updated" });
    expect((await models.pages.get(pathname)).title).toBe("Updated");

    // Logically delete the page
    await models.pages.softRemove(pathname);
    expect(await models.pages.get(pathname)).not.toBeNull();

    // delete ther page
    await models.pages.hardRemove(pathname);
    // @TODO expect
  });

  it("CRUD operations on items", async () => {
    // Create a content item
    const id = await models.items.create({ pathname: "/tmp" });
    expect(models.items.get(id)).toBeDefined();

    // Update the content item
    await models.items.update({ id, content: "Updated" });
    expect((await models.items.get(id)).content).toBe("Updated");

    // Logically delete the content item
    await models.items.remove(id);
    expect(await models.items.get(id)).not.toBeNull();
  });
});

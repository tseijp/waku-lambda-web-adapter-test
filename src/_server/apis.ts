"use server";

import models from "./models";

/**
 * public method
 */
export async function create(formData: FormData) {
  try {
    const title = formData.get("title") as string | null;
    const api = formData.get("api") as string | null;
    if (!title || !api) throw new Error(`apis/create Error: no title or api`);

    // insert new api
    await models.apis.create({ title, api });
    const redirect = `/apis/${api}/setting`;
    return { statusCode: 200, redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

export async function remove(api: string) {
  try {
    await models.apis.remove(api);
    const redirect = `/apis`;
    return { statusCode: 200, redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

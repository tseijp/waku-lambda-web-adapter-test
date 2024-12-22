"use server";

import models from "./models";
import { FormType } from "@/const";

export async function create(api: string) {
  try {
    await models.forms.create({ api });
    const redirect = `/apis/${api}/setting`;
    return { statusCode: 200, redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

export async function update(api: string, formData: FormData) {
  const names = formData.getAll("name");
  const types = formData.getAll("type");
  const titles = formData.getAll("title");
  try {
    const forms = await models.forms.listByApi(api);
    const awaits = forms.map((form, index) => {
      const form_name = names[index] as string;
      const form_type = types[index] as FormType;
      const form_title = titles[index] as string;
      return models.forms.update({ ...form, form_name, form_type, form_title });
    });
    await Promise.all(awaits);
    const redirect = `/apis/${api}`;
    return { statusCode: 200, redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

export async function remove(api: string, id: number) {
  try {
    const items = await models.items.listByForm(id);
    await Promise.all([
      models.forms.remove(id),
      ...items.map((item) => models.items.remove(item.id)),
    ]);
    const redirect = `/apis/${api}/setting`;
    return { statusCode: 200, redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

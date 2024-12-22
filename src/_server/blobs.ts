"use server";

import models from "./models";
import { SUPPORT_MIME_TYPES } from "@/_utils";

/**
 * private method
 */
async function createInput(formData: FormData) {
  const file = formData.get("file");

  if (!file) throw new Error(`create blob Error: no such file found`);
  if (!(file instanceof File))
    throw new Error(`create blob Error: formData file is not File`);
  if (!SUPPORT_MIME_TYPES.has(file.type))
    throw new Error(`create blob Error: Unsupported file type`);

  const buffer = await file.arrayBuffer();
  const file_data = Buffer.from(buffer).toString("base64");
  const file_name = Buffer.from(file.name, "latin1").toString("utf8");
  const file_type = file.type;
  const file_size = buffer.byteLength;

  return {
    file_data,
    file_name,
    file_size,
    file_type,
  };
}

/**
 * public method
 */
export async function create(formData: FormData) {
  try {
    const input = await createInput(formData);
    const id = await models.blobs.create(input);
    const redirect = `/media/${id}`;
    return { statusCode: 200, message: "", redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

export async function update(id: number, formData: FormData) {
  try {
    const input = await createInput(formData);
    await models.blobs.update({ id, ...input });
    const redirect = `/media/${id}`;
    return { statusCode: 200, message: "", redirect };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

export async function remove(blobId: number) {
  try {
    await models.blobs.remove(blobId);
    return { statusCode: 200, message: "" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

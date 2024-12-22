"use server";

import models from "./models";
import { createBlobInput } from "@/_utils";

/**
 * public method
 */
export async function create(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const input = await createBlobInput(file);
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
    const file = formData.get("file") as File;
    const input = await createBlobInput(file);
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

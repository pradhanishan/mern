import { Model, Types } from "mongoose";

export async function getAll<T>(entity: Model<T>): Promise<T[]> {
  const response = await entity.find();
  return response;
}

export async function getById<T>(entity: Model<T>, id: Types.ObjectId | string): Promise<T | null> {
  const response = await entity.findOne({ _id: id });
  return response;
}

export async function add<T>(entity: Model<T>, entry: {}): Promise<void> {
  await entity.create({ ...entry });
}

export async function deleteById<T>(entity: Model<T>, id: Types.ObjectId | string): Promise<void> {
  await entity.deleteOne({ _id: id });
}

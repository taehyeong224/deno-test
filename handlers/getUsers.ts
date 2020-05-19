import { Response } from "https://deno.land/x/oak/mod.ts";
import { getUsers } from "../services/users.ts";

export default async (R: { response: Response }) => {
  R.response.body = await getUsers();
};

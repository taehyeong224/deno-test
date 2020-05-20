import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { createUser } from "../services/users.ts";

export default async (R: { request: Request; response: Response }) => {
  if (!R.request.hasBody) {
    R.response.status = 400;
    R.response.body = { msg: "Invalid user data" };
    return;
  }

  const {
    value: { name, email, password },
  } = await R.request.body();

  if (!name || !email || !password) {
    R.response.status = 422;
    R.response.body = {
      msg: "Incorrect user data. Name and role are required",
    };
    return;
  }
  try {
    const result = await createUser({ name, email, password });

    R.response.body = { msg: "User created", result };
  } catch (e) {
    console.error("error : ", e);
    R.response.body = { msg: "fail", e };
  }
};

import { Request, RouteParams, Response } from "https://deno.land/x/oak/mod.ts";
import { updateUser } from "../services/users.ts";

export default async (R: {
  params: RouteParams;
  request: Request;
  response: Response;
}) => {
  const userId = R.params.id;

  if (!userId) {
    R.response.status = 400;
    R.response.body = { msg: "Invalid user id" };
    return;
  }

  if (!R.request.hasBody) {
    R.response.status = 400;
    R.response.body = { msg: "Invalid user data" };
    return;
  }

  const {
    value: { name, role, jiraAdmin },
  } = await R.request.body();

  await updateUser(userId, { name, role, jiraAdmin });

  R.response.body = { msg: "User updated" };
};

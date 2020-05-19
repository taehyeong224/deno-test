import { RouteParams, Response } from "https://deno.land/x/oak/mod.ts";
import { deleteUser, getUser } from "../services/users.ts";

export default async (R: { params: RouteParams; response: Response }) => {
  const userId = R.params.id;

  if (!userId) {
    R.response.status = 400;
    R.response.body = { msg: "Invalid user id" };
    return;
  }

  const foundUser = await getUser(userId);
  if (!foundUser) {
    R.response.status = 404;
    R.response.body = { msg: `User with ID ${userId} not found` };
    return;
  }

  await deleteUser(userId);
  R.response.body = { msg: "User deleted" };
};

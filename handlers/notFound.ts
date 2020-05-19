import { Response } from "https://deno.land/x/oak/mod.ts";
export default (R: { response: Response }) => {
  R.response.status = 404;
  R.response.body = { msg: "Not Found" };
};

import { Response } from "https://deno.land/x/oak/mod.ts";
export default async (R: { response: Response }, next: any) => {
  try {
    await next();
  } catch (err) {
    R.response.status = 500;
    R.response.body = { msg: err.message };
  }
};

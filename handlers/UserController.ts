import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { UserService } from "../services/UserService.ts";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    console.log("this.userService : ", this.userService);
  }

  public async createUser(
    R: { request: Request; response: Response },
  ): Promise<void> {
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
      const result = await this.userService.createUser(
        { name, email, password },
      );
      R.response.body = { msg: "User created", result };
    } catch (e) {
      console.error("error : ", e);
      R.response.body = { msg: "fail", e };
    }
  }

  getAllUser = async (R: { response: Response }): Promise<void> => {
    try {
      const result = await this.userService.getUsers();
      R.response.body = { msg: "User created", result };
    } catch (e) {
      console.error("error : ", e);
      R.response.body = { msg: "fail", e };
    }
  };
}

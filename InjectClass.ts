import { UserController } from "./handlers/UserController.ts";
import { UserService } from "./services/UserService.ts";
import { UserRepository } from "./repository/UserRepository.ts";

export const userController: UserController = new UserController(
  new UserService(new UserRepository()),
);

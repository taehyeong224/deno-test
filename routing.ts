import { Router } from "https://deno.land/x/oak/mod.ts";
import { userController } from "./InjectClass.ts";

const router = new Router();

router
  .get("/users", userController.getAllUser)
  .post("/users", userController.createUser);

export default router;

import { User } from "../models/user.ts";
import { ExecuteResult } from "https://deno.land/x/mysql/src/connection.ts";
import { UserRepository } from "../repository/UserRepository.ts";

type UserData = Pick<User, "name" | "email" | "password">;

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUsers(): Promise<any> {
    return this.userRepository.select(`select * from user`, []);
  }

  async createUser(
    userData: UserData,
  ): Promise<ExecuteResult> {
    const newUser: User = {
      name: String(userData.name),
      email: String(userData.email),
      password: String(userData.password),
      created_at: new Date(),
      updated_at: new Date(),
    };
    return this.userRepository.insert(
      `INSERT INTO user(name, email, password, created_at, updated_at) values(?, ?, ?, ?, ?)`,
      [
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.created_at,
        newUser.updated_at,
      ],
    );
  }
}

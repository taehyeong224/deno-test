import { fetchData, persistData } from "./db.ts";
import { User } from "../models/user.ts";
import createId from "../services/createId.ts";
import { client } from "../config/mysqlConfig.ts";
import { ExecuteResult } from "https://deno.land/x/mysql/src/connection.ts";

type UserData = Pick<User, "name" | "email" | "password">;

export const getUsers = async (): Promise<User[]> =>
  client.query(`select * from user`);

export const getUser = async (userId: string): Promise<User | undefined> => {
  const users = await fetchData();

  return users.find(({ id }) => id === userId);
};

export const createUser = async (
  userData: UserData,
): Promise<ExecuteResult> => {
  const newUser: User = {
    id: createId(),
    name: String(userData.name),
    email: String(userData.email),
    password: String(userData.password),
    created_at: new Date(),
    updated_at: new Date(),
  };
  return client.execute(
    `INSERT INTO user(name, email, password, created_at, updated_at) values(?, ?, ?, ?, ?)`,
    [
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.created_at,
      newUser.updated_at,
    ],
  );
};

export const updateUser = async (
  userId: string,
  userData: UserData,
): Promise<void> => {
  const user = await getUser(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const users = await fetchData();
  const filteredUsers = users.filter((user) => user.id !== userId);

  // persistData([...filteredUsers, updatedUser]);
};

export const deleteUser = async (userId: string): Promise<void> => {
  const users = await getUsers();
  const filteredUsers = users.filter((user) => user.id !== userId);

  persistData(filteredUsers);
};

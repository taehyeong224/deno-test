import { ICRUD } from "./base/ICRUD.ts";
import { client } from "../config/mysqlConfig.ts";
import { ExecuteResult } from "https://deno.land/x/mysql/src/connection.ts";

export class UserRepository implements ICRUD {
  async insert(query: string, params: any[]): Promise<ExecuteResult> {
    return client.execute(query, params);
  }
  async update(query: string, params: any[]): Promise<ExecuteResult> {
    return client.execute(query, params);
  }

  async delete(query: string, params: any[]): Promise<ExecuteResult> {
    throw new Error("not defined");
  }

  async select(query: string, params: any[]): Promise<ExecuteResult> {
    return client.execute(query, params.length === 0 ? undefined : params);
  }
}

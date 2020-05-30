import { ExecuteResult } from "https://deno.land/x/mysql/src/connection.ts";

export interface ICRUD {
  insert(query: string, params: any[]): Promise<ExecuteResult>;
  update(query: string, params: any[]): Promise<ExecuteResult>;
  delete(query: string, params: any[]): Promise<ExecuteResult>;
  select(query: string, params: any[]): Promise<ExecuteResult>;
}

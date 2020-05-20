import { Client } from "https://deno.land/x/mysql/mod.ts";

export const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "test",
  password: "1234",
  poolSize: 10,
});

export const syncDatabase = async (): Promise<void> => {
  // create database
  await client.execute(`CREATE DATABASE IF NOT EXISTS test`);
  await client.execute(`USE test`);

  // create tables
  await client.execute(`DROP TABLE IF EXISTS user`);
  await client.execute(`
    CREATE TABLE user (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        created_at timestamp not null default current_timestamp,
        updated_at timestamp not null default current_timestamp,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
};

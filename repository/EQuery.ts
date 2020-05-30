export const EQuery = {
  USER: {
    INSERT:
      "INSERT INTO user(name, email, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?)",
    UPDATE: "UPDATE user SET ?? = ?, ?? = ?, ?? = ?, ?? = ?",
    SELECT_ALL: "SELECT * FROM user",
  },
};

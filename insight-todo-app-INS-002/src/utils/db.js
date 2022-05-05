import Dexie from "dexie";

const db = new Dexie("TodoDB");

// Declare tables, IDs and indexes
db.version(1).stores({
  users: "++userid, name, username, password, securityQuestion, securityAnswer",
});

export default db;

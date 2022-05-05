import Dexie from "dexie";

const db = new Dexie("TodoDB");

// Declare tables, IDs and indexes
db.version(1).stores({
  users: "++userid, name, username, password, securityQuestion, securityAnswer, img, cover",
  tasks: "++taskid, taskname, description, startDate, endDate, completed, userid",
});

export default db;
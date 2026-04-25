const fs = require("fs");
const { DB_FILE } = require("../config/database");

class DatabaseService {
  read() {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  }

  write(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }

  getAllClients() {
    const db = this.read();
    return Object.values(db.clients);
  }

  getClient(botId) {
    const db = this.read();
    return db.clients[botId];
  }

  saveClient(client) {
    const db = this.read();
    db.clients[client.id] = client;
    this.write(db);
    return client;
  }

  deleteClient(botId) {
    const db = this.read();
    delete db.clients[botId];
    this.write(db);
    return true;
  }
}

module.exports = new DatabaseService();

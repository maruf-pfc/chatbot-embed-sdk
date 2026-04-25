const databaseService = require("../services/databaseService");
const Client = require("../models/Client");

class AdminController {
  getAllClients(req, res) {
    const clients = databaseService.getAllClients();
    res.json(clients);
  }

  createOrUpdateClient(req, res) {
    try {
      const clientData = req.body;
      const client = new Client(clientData);
      client.validate();

      const saved = databaseService.saveClient(client.toJSON());
      res.json({ success: true, client: saved });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteClient(req, res) {
    const { id } = req.params;
    databaseService.deleteClient(id);
    res.json({ success: true });
  }
}

module.exports = new AdminController();

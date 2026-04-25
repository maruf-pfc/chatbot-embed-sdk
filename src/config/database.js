const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../database");
const DB_FILE = path.join(DB_PATH, "clients.json");

// Ensure database directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize database if not exists
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    clients: {
      "demo-coffee-shop": {
        id: "demo-coffee-shop",
        business_name: "Bean & Brew Coffeehouse",
        business_info: `Open 7am to 7pm daily.
Menu: Espresso $3, Latte $4.50, Cold brew $4.
Pastries: Croissant $3, Muffin $2.50.
Free WiFi. Catering available for 10+ people.
Returns accepted within 14 days with receipt.`,
        fallback_message:
          "I don't have that info — please call us at (555) 727-2834 or ask a barista in-store.",
        bubble_color: "#6F4E37",
        created_at: new Date().toISOString(),
      },
    },
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

module.exports = { DB_FILE };

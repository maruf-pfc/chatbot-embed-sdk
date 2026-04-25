const app = require("./src/app");

const PORT = process.env.PORT || 3341;

app.listen(PORT, () => {
  console.log("\n🚀 ======================================");
  console.log("✅ Chat Widget Server Running");
  console.log("======================================");
  console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`🔐 Login: brightpeak / demo2024`);
  console.log(`🧪 Test Page: http://localhost:${PORT}/coffee-shop.html`);
  console.log(`💪 Gym Demo: http://localhost:${PORT}/gym-website.html`);
  console.log(`💡 Demo Client ID: demo-coffee-shop`);
  console.log("======================================\n");
});

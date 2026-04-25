const app = require("./src/app");

const PORT = process.env.PORT || 3341;

app.listen(PORT, () => {
  console.log("\n🚀 ======================================");
  console.log("✅ Chat Widget Server Running");
  console.log("======================================");
  console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`🧪 Test Page: http://localhost:${PORT}/test.html`);
  console.log(`💡 Demo Client ID: demo-coffee-shop`);
  console.log("======================================\n");
});

// Simple hardcoded auth for demo (can be enhanced later)
const ADMIN_USERNAME = "brightpeak";
const ADMIN_PASSWORD = "brightpeak";

function adminAuth(req, res, next) {
  // Skip auth for API endpoints (they need to work for widget)
  if (req.path.startsWith("/api/")) {
    return next();
  }

  // Skip auth for public assets
  if (
    req.path === "/widget.js" ||
    req.path === "/test.html" ||
    req.path === "/gym-website.html"
  ) {
    return next();
  }

  // Check for auth header
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const base64 = authHeader.split(" ")[1];
    const [username, password] = Buffer.from(base64, "base64")
      .toString()
      .split(":");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return next();
    }
  }

  // Request login
  res.setHeader("WWW-Authenticate", 'Basic realm="BrightPeak Admin Panel"');
  res.status(401).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Admin Login - BrightPeak</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
        .login-box {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 400px;
        }
        h1 { color: #333; margin-bottom: 10px; }
        p { color: #666; margin-bottom: 30px; }
        .btn {
          background: #6F4E37;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }
        .btn:hover { background: #5a3d2b; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>🔐 BrightPeak Admin</h2>
        <p>Please enter your credentials</p>
        <button class="btn" onclick="location.reload()">Login</button>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">A login prompt will appear above ☝️</p>
      </div>
    </body>
    </html>
  `);
}

module.exports = { adminAuth };

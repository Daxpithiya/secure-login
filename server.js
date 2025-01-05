const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual hashed password
const hashedPassword = "$2a$12$hdOOmvtmDUkE4jM/HGZQce7aN.hBG3J0OAqKANyLSPxwZRdi0iziK";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve a simple login form
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <style>
    /* Global Styles */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .login-form {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    h2 {
      margin-bottom: 20px;
      font-size: 24px;
      color: #333;
    }

    input[type="password"] {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #45a049;
    }

    button:active {
      background-color: #3e8e41;
    }

    input[type="password"]:focus,
    button:focus {
      outline: none;
    }

    input[type="password"]:hover,
    button:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <form action="/login" method="POST" class="login-form">
      <h2>Login</h2>
      <input type="password" name="password" placeholder="Enter your password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>
  `);
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { password } = req.body;

  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (result) {
      res.redirect("https://www.localpd.wuaze.com/"); // Replace with your actual website URL
    } else {
      res.send("Incorrect password. Please try again!");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

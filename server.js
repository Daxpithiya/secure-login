const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual hashed password
const hashedPassword = "$2b$10$2WSyT3V/2Q5/1riBVy3dQOgqRaBdRb8RkRbFDny9Tcs7SDkCq1ySi";

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
    </head>
    <body>
      <form action="/login" method="POST">
        <h2>Login</h2>
        <input type="password" name="password" placeholder="Enter your password" required>
        <button type="submit">Login</button>
      </form>
    </body>
    </html>
  `);
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { password } = req.body;

  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (result) {
      res.redirect("https://www.your-main-website.com"); // Replace with your actual website URL
    } else {
      res.send("Incorrect password. Please try again!");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
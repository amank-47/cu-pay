const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // change this if your MySQL username is different
  password: "password", // change to your MySQL password
  database: "cu_pay"
});

db.connect(err => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
});

// Insert payment
app.post("/api/payments", (req, res) => {
  const { name, amount, upi } = req.body;

  if (!name || !amount || !upi) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO payments (name, amount, upi_id) VALUES (?, ?, ?)";
  db.query(sql, [name, amount, upi], (err, result) => {
    if (err) {
      console.error("❌ Error inserting payment:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "✅ Payment stored successfully", id: result.insertId });
  });
});

// Fetch all payments
app.get("/api/payments", (req, res) => {
  const sql = "SELECT * FROM payments ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching payments:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

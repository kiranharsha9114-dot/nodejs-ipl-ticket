const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Dummy Match Data
const matches = [
  { id: 1, team1: "CSK", team2: "MI", stadium: "Chepauk", price: 1500 },
  { id: 2, team1: "RCB", team2: "KKR", stadium: "Chinnaswamy", price: 1800 },
  { id: 3, team1: "SRH", team2: "GT", stadium: "Hyderabad", price: 1200 }
];

// Route to display matches
app.get("/matches", (req, res) => {
  res.json(matches);
});

// Booking Route
app.post("/book", (req, res) => {
  const { name, matchId, tickets } = req.body;

  const match = matches.find(m => m.id == matchId);

  if (!match) {
    return res.send("Match not found");
  }

  const totalAmount = match.price * tickets;

  res.send(`
    <h2>Booking Confirmed 🎉</h2>
    <p>Name: ${name}</p>
    <p>Match: ${match.team1} vs ${match.team2}</p>
    <p>Stadium: ${match.stadium}</p>
    <p>Tickets: ${tickets}</p>
    <p>Total Amount: ₹${totalAmount}</p>
    <a href="/">Back</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

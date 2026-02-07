const express = require("express");
const app = express();
app.use(express.json());

// --- CORS FIX ---
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
// -----------------

let latestProfit = 0;

app.post("/profit", (req, res) => {
    if (typeof req.body.value === "number") {
        latestProfit = req.body.value;
        console.log("Updated profit:", latestProfit);
        res.send("OK");
    } else {
        res.status(400).send("Invalid value");
    }
});

app.get("/profit", (req, res) => {
    res.json({ value: latestProfit });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));

const express = require("express");
const app = express();
app.use(express.json());

let latestProfit = 0;

// Receive profit from Tampermonkey
app.post("/profit", (req, res) => {
    if (typeof req.body.value === "number") {
        latestProfit = req.body.value;
        console.log("Updated profit:", latestProfit);
        res.send("OK");
    } else {
        res.status(400).send("Invalid value");
    }
});

// Tasker fetches this
app.get("/profit", (req, res) => {
    res.json({ value: latestProfit });
});

// Koyeb uses PORT env variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));

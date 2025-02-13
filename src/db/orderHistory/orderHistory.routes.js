import express from "express";
import OrderHistory from "./orderHistory.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userID, tableNumber } = req.query;
    
    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }

    if (!tableNumber) {
      return res.status(400).json({ error: "tableNumber is required" });
    }

    const historyDocs = await OrderHistory.find({ userID, tableNumber });

    res.status(200).json(historyDocs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

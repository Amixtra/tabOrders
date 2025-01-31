import express from "express";
import OrderHistory from "./orderHistory.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }

    const historyDocs = await OrderHistory.find({ userID });
    res.status(200).json(historyDocs);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
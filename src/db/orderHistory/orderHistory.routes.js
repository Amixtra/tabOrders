import express from "express";
import OrderHistory from "./orderHistory.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userID, tableNumber } = req.query;
    const docs = await OrderHistory.find({ userID, tableNumber });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:historyId/confirm", async (req, res) => {
  try {
    const { historyId } = req.params;
    const { items } = req.body;

    const doc = await OrderHistory.findById(historyId);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    items.forEach((i) => {
      const x = doc.items.find((n) => n.itemName === i.itemName);
      if (x) {
        x.confirmation = i.confirmation;
        x.menuStatus = i.confirmation ? "served" : "onProgress";
      }
    });

    await doc.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in confirm route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:historyId/cancel", async (req, res) => {
  try {
    const { historyId } = req.params;
    const { items } = req.body;

    const doc = await OrderHistory.findById(historyId);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }
    items.forEach((i) => {
      const x = doc.items.find((n) => n.itemName === i.itemName);
      if (x && i.confirmation) {
        x.menuStatus = "cancelled";
      }
    });

    await doc.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in cancel route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

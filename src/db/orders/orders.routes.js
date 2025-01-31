import express from "express";
import Order from "./orders.model.js";
import OrderHistory from "../orderHistory/orderHistory.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userID, items, totalPrice, tableNumber, orderType, orderNumber, confirmStatus } = req.body;
    if (!userID || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const newOrder = new Order({
      userID,
      items,
      totalPrice,
      tableNumber,
      orderType,
      orderNumber,
      confirmStatus
    });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ error: "userID is required as a query parameter" });
    }
    const orders = await Order.find({ userID });
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/confirm", async (req, res) => {
  try {
    const { orderNumber, userID } = req.body;
    if (!orderNumber || !userID) {
      return res.status(400).json({ error: "orderNumber and userID required" });
    }
    
    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber, userID },
      { confirmStatus: "Confirmed" },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    let historyDoc = await OrderHistory.findOne({
      userID: updatedOrder.userID,
      tableNumber: updatedOrder.tableNumber
    });

    if (!historyDoc) {
      historyDoc = new OrderHistory({
        userID: updatedOrder.userID,
        tableNumber: updatedOrder.tableNumber,
        items: [],
        totalPrice: 0,
        lastOrderedAt: new Date()
      });
    }

    for (const item of updatedOrder.items) {
      historyDoc.items.push(item);
      historyDoc.totalPrice += item.itemPrice * item.cartItemQuantity;
    }

    historyDoc.lastOrderedAt = new Date();
    await historyDoc.save();

    res.status(200).json({ message: "Order confirmed", order: updatedOrder });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

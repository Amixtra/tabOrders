import express from "express";
import Order from "./orders.model.js";
import OrderHistory from "../orderHistory/orderHistory.model.js";
import Pay from "../pay/pay.model.js";

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
      confirmStatus,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
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
  } catch (error) {
    console.error("Error retrieving orders:", error);
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
      tableNumber: updatedOrder.tableNumber,
    });

    if (!historyDoc) {
      historyDoc = new OrderHistory({
        userID: updatedOrder.userID,
        tableNumber: updatedOrder.tableNumber,
        items: [],
        totalPrice: 0,
        lastOrderedAt: new Date(),
      });
    }

    for (const item of updatedOrder.items) {
      historyDoc.items.push(item);
      historyDoc.totalPrice += item.itemPrice * item.cartItemQuantity;
    }

    historyDoc.lastOrderedAt = new Date();
    await historyDoc.save();

    res.status(200).json({ message: "Order confirmed", order: updatedOrder });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/bills-of-table", async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ error: "userID are required as query parameters." });
    }
    const orders = await Order.find({ userID }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving bills for table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/pay", async (req, res) => {
  try {
    const { userID } = req.query;
    if (!userID) {
      return res.status(400).json({ error: "userID are required as query parameters." });
    }
    const orders = await Pay.find({ userID });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/pay", async (req, res) => {
  try {
    const { userID, tableNumber, paymentType } = req.body;
    if (!userID || !tableNumber || !paymentType) {
      return res.status(400).json({ error: "userID, tableNumber, and paymentType are required" });
    }

    const orders = await Order.find({ userID, tableNumber });
    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this table" });
    }

    const payDocs = [];
    for (const order of orders) {
      const payDoc = new Pay({
        userID: order.userID,
        items: order.items,
        totalPrice: order.totalPrice,
        tableNumber: order.tableNumber,
        orderNumber: order.orderNumber,
        paymentType: paymentType,
        paidAt: new Date(),
      });
      await payDoc.save();
      payDocs.push(payDoc);
    }

    await Order.deleteMany({ userID, tableNumber });
    await OrderHistory.deleteMany({ userID, tableNumber });

    res.status(200).json({ message: "Payment processed and orders moved to pay collection", payDocs });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/assign-items", async (req, res) => {
  try {
    const { assignments } = req.body;
    if (!assignments || !Array.isArray(assignments)) {
      return res.status(400).json({ error: "Invalid assignments payload" });
    }

    for (const assignment of assignments) {
      const { orderId, itemIndex, assignedUser } = assignment;
      const order = await Order.findById(orderId);
      if (!order) continue;

      const targetItem = order.items[itemIndex];
      if (!targetItem) continue;

      if (targetItem.cartItemQuantity > 1) {
        targetItem.cartItemQuantity -= 1;
        order.items.push({
          itemName: targetItem.itemName,
          itemPrice: targetItem.itemPrice,
          cartItemQuantity: 1,
          assignedUser,
        });
      } else {
        targetItem.assignedUser = assignedUser;
      }

      await order.save();
    }

    res.status(200).json({ message: "Items assigned successfully" });
  } catch (error) {
    console.error("Error assigning items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      itemPrice: { type: Number, required: true },
      cartItemQuantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  tableNumber: { type: Number, required: true},
  orderNumber: { type: Number, required: true},
  orderType: { type: String, required: true},
  confirmStatus: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
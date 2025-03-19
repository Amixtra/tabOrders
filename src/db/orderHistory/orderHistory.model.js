import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema({
  userID: { type: String, required: true },
  items: [
    {
      itemName: String,
      itemPrice: Number,
      cartItemQuantity: Number,
      confirmation: { type: Boolean, default: false },
      menuStatus: { type: String, default: "onProgress" },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  tableNumber: { type: Number, required: true },
  lastOrderedAt: { type: Date, default: Date.now },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
export default OrderHistory;
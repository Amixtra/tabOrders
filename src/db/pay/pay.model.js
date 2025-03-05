import mongoose from "mongoose";

const paySchema = new mongoose.Schema({
  userID: { type: String, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      itemPrice: { type: Number, required: true },
      cartItemQuantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  tableNumber: { type: Number, required: true },
  orderNumber: { type: Number, required: true },
  paymentType: { type: String, required: true },
  paidAt: { type: Date, default: Date.now },
});

const Pay = mongoose.model("Pay", paySchema);

export default Pay;
import express from "express";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import toggleRoutes from "./toggles/toggles.routes.js";
import ordersRoutes from "./orders/orders.routes.js";
import uploadRoutes from "./upload/upload.routes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many login attempts. Please try again later." }
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api/toggles", toggleRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/upload", uploadRoutes);


if (!process.env.MONGO_URI) {
  console.log("NO ENV!!")
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch(() => {
    process.exit(1);
  });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, required: false },
  companyFull: { type: String, required: false },
  companyID: { type: String, required: false }
});

const User = mongoose.model("User", userSchema);

function encryptTo16Chars(username, key) {
  const algorithm = "aes-256-ctr";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(username), cipher.final()]);
  const result = Buffer.concat([iv, encrypted]).toString("hex").slice(0, 16);
  return result;
}

function encryptTo32Chars(username, key) {
  const algorithm = "aes-256-ctr";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(username), cipher.final()]);
  const result = Buffer.concat([iv, encrypted]).toString("hex").slice(0, 32);
  return result;
}

const key = crypto.randomBytes(32);

app.post("/api/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: user.userID, username: user.username, company: user.company, companyID: user.companyID },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const { password: _, ...safeUser } = user.toObject();
    res.status(200).json({ message: "Login successful", token, user: safeUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password, company, companyFull } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const userID = encryptTo16Chars(username, key);
    const conflict = await User.findOne({ userID: { $regex: `^${userID.slice(0, 6)}` } });
    if (conflict) {
      return res.status(400).json({ error: "Conflict with existing userID" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      userID,
      email,
      password: hashedPassword,
      company,
      companyFull
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
});

app.post("/api/check-userid", async (req, res) => {
  const { pin } = req.body;
  try {
    if (!pin) {
      return res.status(400).json({ error: "PIN is required" });
    }
    const user = await User.findOne({ userID: { $regex: `^${pin}` } });
    if (user) {
      return res.status(200).json({ userID: user.userID });
    } else {
      return res.status(404).json({ error: "no user found with this PIN" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking user ID" });
  }
});

app.post("/api/get-company", async (req, res) => {
  const { userID } = req.body;
  try {
    if (!userID) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ companyID: user.companyID });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/get-userID", async (req, res) => {
  const { companyID } = req.body;
  try {
    if (!companyID) {
      return res.status(400).json({ error: "companyID is required" });
    }
    const user = await User.findOne({ companyID });
    if (!user) {
      return res.status(404).json({ error: "User not found for this companyID" });
    }
    res.status(200).json({ userID: user.userID });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/company", async (req, res) => {
  const { username, company, companyFull } = req.body;
  try {
    if (!username || !company || !companyFull) {
      return res.status(400).json({ error: "Username and company name are required" });
    }
    const companyID = encryptTo32Chars(company, key);
    const conflict = await User.findOne({ companyID: { $regex: `^${companyID.slice(0, 32)}` } });
    if (conflict) {
      return res.status(400).json({ error: "Conflict with existing companyID" });
    }
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: { company, companyFull, companyID } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "Company registered successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error registering company" });
  }
});

app.post("/api/decrypt-company", async (req, res) => {
  const { company } = req.body;
  try {
    if (!company) {
      return res.status(400).json({ error: "Company ID is required!" });
    }
    const user = await User.findOne({ companyID: company });
    if (!user) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ company: user.company, companyFull: user.companyFull });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/check-username", async (req, res) => {
  const { username } = req.body;
  try {
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking username" });
  }
});

app.post("/api/check-company", async (req, res) => {
  const { company, companyFull } = req.body;
  try {
    if (!company || !companyFull) {
      return res.status(400).json({ error: "Company name and full details are required" });
    }
    const existingCompany = await User.findOne({ company, companyFull });
    if (existingCompany) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking company" });
  }
});

app.post("/api/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking email" });
  }
});

app.post("/api/forgot-password", async (req, res) => {
  const { username, email, company, companyFull } = req.body;
  try {
    if (!username || !email || !company || !companyFull) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ username, email, company, companyFull });
    if (!user) {
      return res.status(404).json({ error: "User not found with these details" });
    }
    const mailOptions = {
      from: `"Amixtra Support" <info.support@amixtra.com>`,
      to: email,
      subject: "Forgot Password Request",
      text: `Hello!`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/categories", async (req, res) => {
  const { company, language = "en" } = req.query;
  try {
    if (!company) {
      return res.status(400).json({ error: "Missing required query parameter: company" });
    }
    const user = await User.findOne({ companyID: company });
    if (!user) {
      return res.status(404).json({ error: "Company not found" });
    }
    const userItems = await mongoose.connection
      .collection("items")
      .find({ userID: user.userID })
      .toArray();
    if (!userItems || userItems.length === 0) {
      return res.status(404).json({ error: "No categories found for this user" });
    }
    const categories = userItems
      .flatMap((item) => item.categories)
      .map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName[language] || category.categoryName.en,
        categoryItems: category.categoryItems.map((item) => ({
          itemId: item.itemId,
          itemName: item.itemName[language] || item.itemName.en,
          itemPrice: item.itemPrice,
          itemSoldOutFlag: item.itemSoldOutFlag,
          itemNewFlag: item.itemNewFlag,
          itemHotFlag: item.itemHotFlag,
          itemPauseFlag: item.itemPauseFlag,
          itemImageUrl: item.itemImageUrl,
          itemDescription: item.itemDescription,
          allergies: item.allergies,
        }))
      }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/categories", async (req, res) => {
  const { userID, categoryId } = req.body;
  try {
    const result = await mongoose.connection.collection("items").updateOne(
      { userID },
      {
        $pull: {
          categories: { categoryId: parseInt(categoryId, 10) }
        }
      }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Category not found or already deleted" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/categories", async (req, res) => {
  const { userID, categoryNameEN, categoryNameJP, categoryNameKR, categoryNameZH } = req.body;
  if (!userID || !categoryNameEN) {
    return res.status(400).json({ error: "Missing userID or categoryName" });
  }
  try {
    const doc = await mongoose.connection.collection("items").findOne({ userID });
    if (!doc) {
      return res.status(404).json({ error: "No items doc found for this user" });
    }
    const existingCategoryIds = doc.categories.map((cat) => cat.categoryId);
    const maxId = existingCategoryIds.length > 0 ? Math.max(...existingCategoryIds) : 0;
    const newId = maxId + 1;
    const newCategory = {
      categoryId: newId,
      categoryName: {
        en: categoryNameEN,
        ko: categoryNameKR || categoryNameEN,
        ja: categoryNameJP || categoryNameEN,
        zh: categoryNameZH || categoryNameEN
      },
      categoryItems: []
    };
    await mongoose.connection.collection("items").updateOne(
      { userID },
      { $push: { categories: newCategory } }
    );
    res.status(201).json({
      message: "Category created successfully",
      categoryId: newId,
      categoryName: categoryNameEN,
      categoryItems: []
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/items/flags", async (req, res) => {
  const { userID, categoryId, itemId, flagName, newValue } = req.body;
  try {
    const doc = await mongoose.connection.collection("items").findOne({ userID });
    if (!doc) {
      return res.status(404).json({ error: "No items doc found for this user" });
    }
    await mongoose.connection.collection("items").updateOne(
      { userID, "categories.categoryId": categoryId, "categories.categoryItems.itemId": itemId },
      {
        $set: {
          [`categories.$[cat].categoryItems.$[itm].${flagName}`]: newValue
        }
      },
      {
        arrayFilters: [
          { "cat.categoryId": categoryId },
          { "itm.itemId": itemId }
        ]
      }
    );
    return res.status(200).json({ message: "Flag updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/items", async (req, res) => {
  const {
    userID,
    categoryId,
    itemId,
    itemNameEN,
    itemNameKR,
    itemNameJP,
    itemNameZH,
    itemPrice,
    itemDescription,
    itemImageUrl,
    allergies
  } = req.body;
  if (!userID || !categoryId || !itemNameEN) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const doc = await mongoose.connection.collection("items").findOne({ userID });
    if (!doc) {
      return res.status(404).json({ error: "No items doc found for this user" });
    }
    const categoryIndex = doc.categories.findIndex(
      (cat) => cat.categoryId === parseInt(categoryId, 10)
    );
    if (categoryIndex === -1) {
      return res.status(404).json({ error: "Category not found" });
    }
    const newItem = {
      itemId: itemId,
      itemName: {
        en: itemNameEN,
        ko: itemNameKR || itemNameEN,
        ja: itemNameJP || itemNameEN,
        zh: itemNameZH || itemNameEN
      },
      itemPrice: itemPrice || 0,
      itemDescription: itemDescription || "",
      itemImageUrl: itemImageUrl || "",
      itemSoldOutFlag: false,
      itemNewFlag: false,
      itemHotFlag: false,
      itemPauseFlag: false,
      allergies: allergies,
    };
    await mongoose.connection.collection("items").updateOne(
      { userID, "categories.categoryId": parseInt(categoryId, 10) },
      {
        $push: {
          "categories.$.categoryItems": newItem
        }
      }
    );
    return res.status(201).json({
      message: "Item added successfully",
      itemId: itemId,
      itemName: itemNameEN,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
      itemImageUrl: itemImageUrl
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import Toggles from "./toggles.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { company } = req.query;
    if (!company) {
      return res.status(400).json({ error: "Missing company query param" });
    }
    const toggles = await Toggles.findOne({ companyID: company });
    if (!toggles) {
      const newToggles = new Toggles({ companyID: company });
      await newToggles.save();
      return res.status(200).json(newToggles);
    }
    return res.status(200).json(toggles);
  } catch (error) {
    console.error("Error fetching toggles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { company, isToggleOrderOn, isToggleLockOn, isToggleMuteOn } = req.body;
    if (!company) {
      return res.status(400).json({ error: "company is required in request body" });
    }

    let toggles = await Toggles.findOne({ companyID: company });
    if (!toggles) {
      toggles = new Toggles({ companyID: company });
    }

    if (typeof isToggleOrderOn === "boolean") toggles.isToggleOrderOn = isToggleOrderOn;
    if (typeof isToggleLockOn === "boolean")  toggles.isToggleLockOn  = isToggleLockOn;
    if (typeof isToggleMuteOn === "boolean")  toggles.isToggleMuteOn  = isToggleMuteOn;

    await toggles.save();
    return res.status(200).json({ message: "Toggles updated", toggles });
  } catch (error) {
    console.error("Error updating toggles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

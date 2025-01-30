import express from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { upload } from "./upload.middleware.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const router = express.Router();
const s3Client = new S3Client({ 
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

router.post("/", upload, async (req, res) => {
  try {

    const company = req.body.company;
    if (!company) {
      return res.status(400).json({
        error: "No company ID present in JWT payload"
      });
    }

    const category = req.body.category; 
    if (!category) {
      return res
        .status(400)
        .json({ error: "No category provided in form data" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const fileContent = file.buffer;
    const originalName = file.originalname;
    const uniqueId = crypto.randomUUID();
    const timestamp = Date.now();

    const normalizedCategory = category.replace(/\s+/g, '-'); 
    const s3Key = `companies/${company}/${normalizedCategory}/${timestamp}_${uniqueId}_${originalName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    const objectUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

    return res.status(200).json({
      message: "File uploaded successfully",
      objectUrl
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "S3 upload error" });
  }
});

export default router;

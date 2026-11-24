
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Clipdrop route");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "Please provide a prompt." });
    }

    if (!process.env.CLIPDROP_API_KEY) {
      return res.status(500).json({ error: "Image generation is not configured." });
    }

    const formData = new FormData();
    formData.append("prompt", prompt.trim());

    const response = await fetch(
      "https://clipdrop-api.co/text-to-image/v1",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Clipdrop error:", response.status, errorText);

      return res.status(502).json({
        error: "Image generation failed. Please try again.",
      });
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "image/png";
    const base64Image = imageBuffer.toString("base64");

    return res.status(200).json({
      photo: `data:${contentType};base64,${base64Image}`,
    });

  } catch (error) {
    console.error("Image generation error:", error.message);

    return res.status(500).json({
      error: "Something went wrong while generating the image.",
    });
  }
});

export default router;

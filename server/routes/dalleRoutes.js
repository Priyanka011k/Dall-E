


// // import express from "express";
// // import * as dotenv from "dotenv";
// // import OpenAI from "openai";

// // dotenv.config();
// // const router = express.Router();

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // router.route("/").get((req, res) => {
// //   res.send("Hello from DALL-E route");
// // });


// // router.route("/").post(async (req, res) => {
// //     try {
// //         const { prompt } = req.body;
// //         const aiResponse = await openai.images.generate({
// //             model: "dall-e-2",
// //             prompt,
// //             size: "1024x1024",
// //             response_format: "b64_json",
// //         });
// //         const image = aiResponse.data[0].b64_json;
// //         res.status(200).json({ photo: image });
// //     } catch (error){
// //         console.error("DALL-E error:", error);
// //         res.status(500).json({
// //         error: error?.response?.data?.error?.message || "Image generation failed", });
// //     }
// // })

// // export default router;

// import express from "express";
// import * as dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();
// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.route("/").get((req, res) => {
//   res.send("Hello from DALL-E route");
// });

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log("Received prompt:", prompt);

//     const aiResponse = await openai.images.generate({
//       model: "dall-e-2", // fallback to DALL·E 2 for free-tier compatibility
//       prompt,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const image = aiResponse?.data?.[0]?.b64_json;

//     if (!image) {
//       throw new Error("No image returned from OpenAI");
//     }

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error("DALL-E error:", error);

//     res.status(500).json({
//       error:
//         error?.response?.data?.error?.message ||
//         error?.message ||
//         "Image generation failed",
//     });
//   }
// });

// export default router;
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from Clipdrop route");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    console.log("Clipdrop response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Clipdrop error response:", errorText);

      // Optional fallback image (base64 placeholder)
      const fallbackImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...";
      return res.status(200).json({ photo: fallbackImage });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    res.status(200).json({ photo: `data:image/png;base64,${base64Image}` });
  } catch (error) {
    console.error("Clipdrop error:", error.message);
    res.status(500).json({
      error: error.message || "Image generation failed",
    });
  }
});

export default router;

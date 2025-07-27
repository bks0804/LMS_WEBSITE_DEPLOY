// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/upload-video", upload.single("file"), async (req, res) => {
//   try {
//     const { buffer, originalname } = req.file;

//     const uploadStream = () =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "file",
//             resource_type: "video",
//             public_id: originalname.split(".")[0],
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           }
//         );
//         streamifier.createReadStream(buffer).pipe(stream);
//       });

//     // Upload the file
//     const result = await uploadStream();
//     const file = result.secure_url;

//     if (file) {
//       return res.status(200).json({
//         success: true,
//         data: file,
//         message: "File uploaded successfully",
//       });
//     }
//   } catch (error) {}
// });

// module.exports = router;

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload-video", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file provided" });
  }

  try {
    const { buffer, originalname } = req.file;

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "videos",
            resource_type: "video",
            public_id: originalname.split(".")[0],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    // Upload the video
    const result = await uploadStream();

    return res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const upload = require("../utils/multer");
// const {
//   register,
//   login,
//   getUserProfile,
//   updateProfile,
// } = require("../controllers/userController");
// const isAuthenticated = require("../middleware/isAuthenticated");
// router.post("/register", register);
// router.post("/login", login);
// router.get("/profile", isAuthenticated, getUserProfile);
// router.put(
//   "/profile/update",
//   isAuthenticated,
//   upload.single("profilePhoto"),
//   updateProfile
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
// const streamifier = require("streamifier");
// const cloudinary = require("../utils/cloudinary");
const {
  register,
  login,
  getUserProfile,
  updateProfile,
  getAllAdmin,
  getAllStudent,
  updateStudentToAdmin,
  userDelete,
  addTeacherRating,
  userAttendance,
  getAttendanceDetailToAdmin,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  signupValidation,
  signinValidation,
} = require("../middleware/inputValidation");

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image
// router.put(
//   "/profile/update",
//   isAuthenticated,
//   upload.single("profilePhoto"),
//   async (req, res) => {
//     try {
//       // Ensure a file is provided
//       if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       const { buffer, originalname } = req.file;

//       // Function to handle Cloudinary upload using streams
//       const uploadStream = () =>
//         new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             {
//               folder: "profile_photos", // Cloudinary folder
//               resource_type: "image", // Specify that it's an image
//               public_id: originalname.split(".")[0], // Use original name as public_id
//             },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result);
//             }
//           );
//           streamifier.createReadStream(buffer).pipe(stream); // Stream the buffer
//         });

//       // Upload the file
//       const result = await uploadStream();

//       // Send response with the Cloudinary URL
//       res.status(200).json({
//         message: "Image uploaded successfully",
//         photoUrl: result.secure_url,
//       });
//     } catch (error) {
//       console.error("Error uploading image:", error.message);
//       res
//         .status(500)
//         .json({ error: "Failed to upload image", details: error.message });
//     }
//   }
// );

router.post("/register", signupValidation, register);
router.post("/login", signinValidation, login);
router.get("/profile", isAuthenticated, getUserProfile);
router.get("/getalladmin", getAllAdmin);
router.get("/getallstudent", getAllStudent);
router.put(
  "/:userId/updateStudentToAdmin",
  isAuthenticated,
  updateStudentToAdmin
);

router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateProfile
);
router.put("/addteacherrating", isAuthenticated, addTeacherRating);

router.delete("/:userId", isAuthenticated, userDelete);
router.post("/attendance/mark", isAuthenticated, userAttendance);
router.get(
  "/:courseId/:lectureId/getuserslectureattendance",
  isAuthenticated,
  getAttendanceDetailToAdmin
);
module.exports = router;

const { generateToken } = require("../utils/generateToken");

const User = require("../models/userModel");
const Course = require("../models/courseModel");
const bcrypt = require("bcrypt");
const {
  deletMediaFromCloudinary,
  uploadMedia,
} = require("../utils/cloudinary");
const multer = require("multer");
const streamifier = require("streamifier");
// const cloudinary = require("../utils/cloudinary");

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const dotenv = require("dotenv");
const { generateUserUniqueId } = require("../utils/generateUniqueId");
const Attendance = require("../models/attendanceModel");

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      dateOfBirth,
      permanentAddress,
      school_CollegeName,
      board_UniversityName,
      class_DegreeName,
      yearOfStudy,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !phoneNumber ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User is already exist with this email",
      });
    }

    //hash password generate for password security
    const hashedPassword = await bcrypt.hash(password, 10);

    const uniqueId = generateUserUniqueId(
      firstName,
      lastName,
      dateOfBirth,
      gender
    );
    // console.log(uniqueId);

    if (!uniqueId) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate user ID",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      phoneNumber,
      dateOfBirth,
      permanentAddress,
      school_CollegeName,
      board_UniversityName,
      class_DegreeName,
      yearOfStudy,
      userUniqueId: uniqueId,
    });

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        registerUser: newUser,
      });
    }
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to register" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const token = generateToken(user);

    res
      .status(200)
      // .cookie("token", token, {
      //   httpOnly: true,
      //   sameSite: "strict",
      //   maxAge: 24 * 60 * 60 * 1000,
      // })
      .json({
        success: true,
        message: `WElcome back ${user.name}`,
        user,
        token,
      });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const getUser = await User.findById(userId)
      .select("-password")
      .populate({
        path: "enrolledCourses",
        populate: [
          { path: "lectures", populate: { path: "ratings" } },
          { path: "creator", select: "name" },
        ],
      });

    if (!getUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user: getUser });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Falied to Load User" });
  }
};

// const getAllUserProfile = async (req, res) => {
//   try {
//     const userId = req.id;

//     const user = await User.find({ userId });
//     let = allUser;

//     if (user.role === "superadmin") {
//       allUser = await User.find();
//     }

//     return res.status(200).json({
//       success: true,
//       users: allUser,
//     });
//   } catch (error) {}
// };

// const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const name = req.body.name;
//     const profilePhoto = req.file;
//     // console.log("from update profile", profilePhoto);

//     const user = await User.findById(userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Extract publicId from existing img
//     if (user.photoUrl) {
//       const publicId = user.photoUrl.split("/").pop().split(".")[0];
//       deletMediaFromCloudinary(publicId);
//     }

//     //Upload new photo
//     const cloudResponse = await uploadMedia(profilePhoto);
//     // const cloudResponse = await uploadMedia(profilePhoto);

//     // const photoUrl = cloudResponse.secure_url;
//     const photoUrl = cloudResponse;

//     const updatedData = { name, photoUrl };

//     const updateUser = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     }).select("-password");

//     return res.status(200).json({
//       success: true,
//       user: updateUser,
//       message: "Profile Updated Successfully",
//     });
//   } catch (error) {
//     // console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Falied to Update User" });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const name = req.body.name;
    const profilePhoto = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure a file is provided
    if (!profilePhoto) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { buffer, originalname } = req.file;

    // Function to handle Cloudinary upload using streams
    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profile_photos",
            resource_type: "image",
            public_id: originalname.split(".")[0],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    // Upload the file
    const result = await uploadStream();
    const photoUrl = result.secure_url;

    const updatedData = { name, photoUrl };

    const updateUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updateUser,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    res
      .status(500)
      .json({ error: "Failed to upload image", details: error.message });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const getAdmins = await User.find({ role: "admin" });
    // const course = await Course.find({ creator: getAdmins.id });
    return res.status(200).json({
      success: true,
      admins: getAdmins || [],
      // course,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const getStudents = await User.find({ role: "student" });

    return res.status(200).json({
      success: true,
      students: getStudents || [],
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateStudentToAdmin = async (req, res) => {
  try {
    const {
      role,
      specialization,
      salary,
      dateOfJoining,
      experience,
      goodWords,
    } = req.body;
    const { userId } = req.params;

    if (
      !userId ||
      !role ||
      !specialization ||
      !salary ||
      !dateOfJoining ||
      !experience ||
      !goodWords
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Please fill all The Fields" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found!" });
    }

    const updateData = {
      role,
      specialization,
      salary,
      dateOfJoining,
      experience,
      goodWords,
    };
    const updateAdmin = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updateAdmin,
      message: "Admin Profile Updated Successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Admin profile",
    });
  }
};

const userDelete = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required!" });
    }

    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res.status(200).json({
      success: true,
      deleteUser,
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error!" });
  }
};

const addTeacherRating = async (req, res) => {
  try {
    const { adminId, rating } = req.body;
    const userId = req.id; // ID of the user giving the rating

    const user = await User.findById(adminId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ success: false, message: "Not a teacher" });
    }

    // Check if the user has already rated
    user.ratingsOfTeacher = user.ratingsOfTeacher || [];

    const alreadyRated = user.ratingsOfTeacher?.find(
      (r) => r.userId.toString() === userId.toString()
    );
    if (alreadyRated) {
      return res
        .status(400)
        .json({ success: false, message: "You already rated this teacher" });
    }

    // Add new rating
    user.ratingsOfTeacher.push({ userId, rating });
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Teacher rating updated successfully",
      updatedUser,
    });
  } catch (error) {
    // console.log("Error in addTeacherRating:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const userAttendance = async (req, res) => {
  const { status, courseId, lectureId } = req.body;
  const studentId = req.id;
  const today = new Date().toISOString().split("T")[0];

  if (!courseId || !lectureId) {
    return res
      .status(400)
      .json({ success: false, message: "courseId and lectureId are required" });
  }

  const existing = await Attendance.findOne({
    studentId,
    date: today,
    courseId,
    lectureId,
  });

  if (existing) {
    return res
      .status(400)
      .json({ message: "Attendance already marked for today" });
  }

  const newAttendance = await Attendance.create({
    studentId,
    courseId,
    lectureId,
    date: today,
    status,
  });

  res.status(200).json(newAttendance);
};

const getAttendanceDetailToAdmin = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId, lectureId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. User is not a superadmin",
      });
    }

    const existingAttendance = await Attendance.find({
      courseId,
      lectureId,
    }).populate("courseId");

    if (existingAttendance.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Attendance found",
        attendance: existingAttendance,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// const getTeacherExistRating = async (req, res) => {
//   const { lectureId } = req.body;
//   const { courseId } = req.params;
//   const userId = req.id;
//   try {
//     const existingRating = await Rating.find({
//       lectureId,
//       courseId,
//       userId,
//     });

//     if (existingRating) {
//       return res.status(200).json({
//         success: true,
//         message: "Existing rating found",
//         rating: existingRating,
//       });
//     }

//     return res
//       .status(404)
//       .json({ success: false, message: "Rating not found" });
//   } catch (error) {
//     console.error("Error fetching rating:", error);
//     res.status(500).json({ success: false, error: "Something went wrong" });
//   }
// };
module.exports = {
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
};

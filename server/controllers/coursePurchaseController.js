const Razorpay = require("razorpay");
const Course = require("../models/courseModel");
const Lecture = require("../models/lectureModel");
const User = require("../models/userModel");
const CoursePurchase = require("../models/coursePurchaseModel");
// const CryptoJS = require("crypto-js");
const {
  generateStudentAndCourseUniqueId,
} = require("../utils/generateUniqueId");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      currency: "INR",
    });

    await newPurchase.save();

    const options = {
      amount: course.coursePrice * 100,
      currency: "INR",
      receipt: newPurchase._id.toString(),
    };

    const order = await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({ data: order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Order not created!" });
  }
};

// const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing payment details!" });
//     }

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex");

//     if (expectedSign !== razorpay_signature) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Payment Signature" });
//     }

//     const updatedPurchase = await CoursePurchase.findOneAndUpdate(
//       { userId: req.id, status: "pending" },
//       {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         status: "Complete",
//       },
//       { new: true }
//     );
//     // console.log(updatedPurchase);
//     if (!updatedPurchase) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Purchase record not found!" });
//     }

//     return res.json({
//       success: true,
//       message: "Payment Verified",
//       data: updatedPurchase,
//     });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({ message: "Internal Server Error!" });
//   }

//   // Handle the purchase course status Complete
//   // const { razorpay_order_id } = req.body;

//   // const purchaseCourse = await CoursePurchase.find({
//   //   razorpay_order_id,
//   //   status: "Complete",
//   // });
//   // if (!purchaseCourse) {
//   //   return res
//   //     .status(404)
//   //     .json({ success: false, message: "Purchase record not found!" });
//   // }
// };

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment details!" });
    }

    // Verify payment signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    // const expectedSign = CryptoJS.hma
    //   .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    //   .update(sign)
    //   .digest("hex");

    // const expectedSign = CryptoJS.HmacSHA256(sign, process.env.RAZORPAY_KEY_SECRET).toString(CryptoJS.enc.Hex);

    // if (expectedSign !== razorpay_signature) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid Payment Signature" });
    // }

    // Find and update purchase record
    const purchase = await CoursePurchase.findOneAndUpdate(
      { userId: req.id, status: "pending" },
      {
        razorpay_payment_id,
        razorpay_signature,
        razorpay_order_id,
        status: "completed",
      },
      { new: true }
    ).populate({ path: "courseId" });

    // console.log(purchase);

    if (!purchase) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase record not found!" });
    }

    // Unlock lectures for the user
    if (purchase?.courseId && purchase?.courseId?.lectures?.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    const loginUser = await User.findById(purchase?.userId);
    const userCourse = await Course.findById(purchase?.courseId);

    if (!loginUser || !userCourse) {
      throw new Error("User or Course not found");
    }

    // unique id generation
    const { firstName, lastName, dateOfBirth } = loginUser;
    const { courseTitle } = userCourse;

    const uniqueId = generateStudentAndCourseUniqueId(
      firstName,
      lastName,
      dateOfBirth,
      courseTitle
    );
    // console.log(uniqueId);

    // Enroll user in the course
    await User.findByIdAndUpdate(
      purchase?.userId,
      {
        $addToSet: {
          enrolledCourses: purchase.courseId._id,
          userCourseUniqueId: uniqueId,
        },
      },
      { new: true }
    );

    // Add user to course's enrolled students list
    await Course.findByIdAndUpdate(
      purchase?.courseId?._id,
      { $addToSet: { enrolledStudents: purchase.userId } },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Payment Verified & Course Enrolled",
      data: purchase,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getCourseDetaisWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    return res
      .status(200)
      .json({ course, purchased: purchased ? true : false });
  } catch (error) {
    // console.log(error);
  }
};

// const getAllPurchasedCourse = async (req, res) => {
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId);
//     const courses = await Course.find({
//       creator: userId,
//     });

//     const creator = courses.creator;

//     let purchasedCourse;

//     if (user.role === "superadmin") {
//       purchasedCourse = await CoursePurchase.find({
//         status: "completed",
//       }).populate("courseId");
//     } else if (user.role === "admin") {
//       purchasedCourse = await CoursePurchase.find({
//         // courseId.creator: user._id,
//         status: "completed",
//       }).populate("courseId");
//     }

//     if (!purchasedCourse) {
//       return res.status(404).json({ purchasedCourse: [] });
//     }

//     return res.status(200).json({ purchasedCourse });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getAllPurchasedCourse = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    let purchasedCourse;

    if (user.role === "superadmin") {
      purchasedCourse = await CoursePurchase.find({
        status: "completed",
      }).populate("courseId");
    } else if (user.role === "admin") {
      purchasedCourse = await CoursePurchase.find({
        status: "completed",
      }).populate({
        path: "courseId",
        match: { creator: userId },
      });
      // .then((results) => results.filter((pc) => pc.courseId));
    }

    return res.status(200).json({ purchasedCourse });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCheckoutSession,
  verifyPayment,
  getCourseDetaisWithPurchaseStatus,
  getAllPurchasedCourse,
};

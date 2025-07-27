const ContactUs = require("../models/contactUsModel");
const User = require("../models/userModel");

const queryRegister = async (req, res) => {
  try {
    const { fullName, email, subject, phoneNumber, message } = req.body;

    if (!fullName || !email || !subject || !phoneNumber || !message) {
      return res.status(404).json({
        success: false,
        message: "please fill all the fields!",
      });
    }

    const userId = req.id;

    const userExisted = await User.find({ userId });

    if (!userExisted) {
      return res.status(404).json({
        success: false,
        message: "User not register!",
      });
    }

    const createQuery = await ContactUs.create({
      fullName,
      email,
      subject,
      phoneNumber,
      message,
      userId: userId,
    });

    if (createQuery) {
      return res.status(200).json({
        success: true,
        message: "Query is created!",
        createQuery,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to create query!",
    });
  }
};

const getAllQuery = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (["admin", "superadmin"].includes(user.role)) {
      const allQuery = await ContactUs.find();

      return res.status(200).json({ success: true, query: allQuery || [] });
    }

    return res.status(403).json({ success: false, message: "Unauthorized" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch queries!",
    });
  }
};

const deleteQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    const userId = req.id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.role === "admin" || user.role === "superadmin") {
      const deletedQuery = await ContactUs.findByIdAndDelete(queryId);

      if (!deletedQuery) {
        return res.status(404).json({
          success: false,
          message: "Query not found!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Query deleted successfully!",
        deletedQuery,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! You don't have permission to delete queries.",
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete query!",
    });
  }
};
// const replyToQuery = async (req, res) => {
//   try {
//     const { queryId } = req.params;
//     const { replyText, userId } = req.body;
// console.log(replyText, userId)
//     const user = await User.findByIdAndUpdate( userId ,{queryReply:replyText});

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found!",
//       });
//     }

//     return res.status(200).json({
//       success:true,
//       message:"query replied succesfully",
//       reply:user?.queryReply
//     })

//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to reply!",
//     });
//   }
// };

const replyToQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { replyText } = req.body;

    // console.log("Reply Text Received:", replyText);

    // if (!mongoose.Types.ObjectId.isValid(queryId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid Query ID!",
    //   });
    // }

    // if (!replyText || typeof replyText !== "string") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Reply text is required and must be a string!",
    //   });
    // }

    const query = await ContactUs.findByIdAndUpdate(
      queryId,
      { queryReply: replyText },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Query replied successfully!",
      query,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to reply!",
    });
  }
};
const getQueryReply = async (req, res) => {
  try {
    const userId = req.id;

    const userQuery = await ContactUs.findOne({ userId });

    if (!userQuery) {
      return res.status(404).json({
        success: false,
        message: "User Query not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "query replied succesfully",
      reply: userQuery,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to reply!",
    });
  }
};
module.exports = {
  queryRegister,
  deleteQuery,
  getAllQuery,
  replyToQuery,
  getQueryReply,
};

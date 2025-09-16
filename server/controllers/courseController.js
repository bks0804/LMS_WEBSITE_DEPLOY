const { default: mongoose } = require("mongoose");
const Course = require("../models/courseModel");
const streamifier = require("streamifier");
const Lecture = require("../models/lectureModel");
const cloudinary = require("cloudinary").v2;
const deletMediaFromCloudinary = require("../utils/cloudinary");
const User = require("../models/userModel");

const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course Title and Category are required",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({ course, message: "Course Created.." });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

// const getCreatedCourse = async (req, res) => {
//   try {
//     const userId = req.id;
//     const userRole = req.role;
//     // console.log(req);
//     const courses = await Course.find({ creator: userId });
//     // console.log(courses);
//     if (!courses) {
//       return res.status(404).json({
//         courses: [],
//         message: "Course not found",
//       });
//     }

//     return res.status(200).json({
//       courses,
//     });
//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({
//       message: "Failed to create course",
//     });
//   }
// };

const getCreatedCourse = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const userRole = user.role;

    let courses;

    if (userRole === "superadmin") {
      courses = await Course.find();
    } else {
      courses = await Course.find({ creator: userId });
    }

    if (!courses || courses?.length === 0) {
      return res.status(404).json({
        courses: [],
        message: "No courses found!",
      });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch courses" });
  }
};

const editCourse = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const { Title, subTitle, description, category, courseLevel, coursePrice } =
      req.body;

    // const thumbnail = req.file;

    if (
      !Title ||
      !subTitle ||
      !description ||
      !category ||
      !courseLevel ||
      !coursePrice
    ) {
      return res.status(404).json({
        message: "Please fill all required field",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { buffer, originalname } = req.file;

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "courseThumbnail",
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
    const courseThumbnail = result.secure_url;

    if (!courseThumbnail) {
      return res.status(404).json({ message: "course thumbnail is required" });
    }

    const updateData = {
      courseTitle: Title,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail,
    };

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(400).json({ message: "updated course error" });
    }

    return res.status(200).json({
      updatedCourse,
      message: "Course updated Successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: "Failed to update course",
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get course by id" });
  }
};

const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(404).json({
        message: "Lecture title is required",
      });
    }

    //create lecture

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture Created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create lecture by id" });
  }
};

const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get course lecture" });
  }
};

const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree, meetingId, lectureType } =
      req.body;
    const { courseId, lectureId } = req.params;
    console.log(req.body);

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture not found!" });
    }
    //Update Lecture
    if (lectureTitle) lecture.lectureType = lectureType;
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl && videoInfo.publicId) {
      lecture.videoUrl = videoInfo.videoUrl;
      lecture.publicId = videoInfo.publicId;
      lecture.meetingId = null;
    } else {
      lecture.meetingId = meetingId;
      lecture.videoUrl = null;
      lecture.publicId = null;
    }
    // if (videoInfo.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // ensure the lecture id exist in course.lectures if not then push it
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
    }
    console.log(lecture);

    return res
      .status(200)
      .json({ lecture, message: "Lecture updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to edit lecture" });
  }
};

const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture not found for remove" });
    }

    // delete lecture from cloudinary
    if (lecture.publicId) {
      deletMediaFromCloudinary(lecture.publicId);
    }

    //remove lecture from associated course
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({ message: "Lecture removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove lecture" });
  }
};

const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture not found" });
    }

    return res.status(200).json({ lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get lecture" });
  }
};

// publish / Unpublish course
const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { isPublished } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    course.isPublished = Boolean(isPublished);
    await course.save();

    return res.status(200).json({
      message: `Course is ${course.isPublished ? "Published" : "Unpublished"}`,
      course,
    });
  } catch (error) {
    console.error("Error updating publish status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate([
      {
        path: "creator",
        select: "firstName lastName photoUrl name",
      },
      {
        path: "lectures",
        populate: {
          path: "ratings",
        },
      },
    ]);

    if (!courses) {
      return res.status(404).json({ message: "Courses are not found!" });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get published courses" });
  }
};

// For Search

const searchCourse = async (req, res) => {
  try {
    const {
      query = "",
      categories = [],
      sortByPrice = "",
      sortByLevel = "",
    } = req.query;

    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    if (categories?.length > 0) {
      searchCriteria.category = { $in: categories };
    }

    if (sortByLevel) {
      searchCriteria.courseLevel = {
        $regex: sortByLevel,
        $options: "i",
      };
    }

    // console.log(searchCriteria.courseLevel);

    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; //decending
    }

    let courses = await Course.find(searchCriteria)
      .populate({
        path: "creator",
        select: "name firstName lastName photoUrl",
      })
      .sort(sortOptions);

    return res.status(200).json({ sucess: true, courses: courses || [] });
  } catch (error) {
    console.error("Error searching courses:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // console.log(courseId)
    const course = await Course.findByIdAndDelete(courseId);
    // console.log(course)

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "course Remove Successfully",
    });
  } catch (error) {
    console.error("Error removing course:", error);
    res.status(500).json({ message: "Failed to remove course" });
  }
};
module.exports = {
  createCourse,
  getCreatedCourse,
  editCourse,
  getCourseById,
  createLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
  getLectureById,
  togglePublishCourse,
  getPublishedCourse,
  searchCourse,
  removeCourse,
};

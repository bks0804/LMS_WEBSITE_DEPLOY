// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();
// const dotenv = require("dotenv");

// cloudinary.config({
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// });

// const uploadMedia = async (file) => {
//   try {
//     // const uploadResponse = await cloudinary.uploader.upload(file, {
//     //   resource_type: "auto",
//     // });
//     // console.log(file);
//     const uploadResponse = await cloudinary.uploader.upload(file);
//     // console.log("------------- Cloud response");
//     // console.log(uploadResponse);
//     return uploadResponse;
//   } catch (error) {
//     // console.log("------------- Cloud error");

//     // console.log(error);
//   }
// };

// const deletMediaFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     // console.log(error);
//   }
// };
// const deletVideoFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
//   } catch (error) {
//     // console.log(error);
//   }
// };

// module.exports = {
//   deletMediaFromCloudinary,
//   deletVideoFromCloudinary,
//   uploadMedia,
// };

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const dotenv = require("dotenv");

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const deletVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    // console.log(error);
  }
};
module.exports = { cloudinary, deletVideoFromCloudinary };

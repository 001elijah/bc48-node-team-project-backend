// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
// const cloudinary = require('cloudinary').v2;

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET
// });

// // Function to upload the default image
// const uploadDefaultImage = async (imagePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(imagePath);
//     console.log('Default image uploaded successfully:', result.secure_url);
//   } catch (error) {
//     console.error('Error uploading default image:', error);
//   }
// };

// module.exports = {
//   cloudinaryConfig: cloudinary,
//   uploadDefaultImage: uploadDefaultImage
// };

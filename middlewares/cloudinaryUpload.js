const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { HttpError } = require('../helpers');

// Cloudinary configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'] // Specify the allowed file formats
  }
});
const upload = multer({ storage });

// Upload file to Cloudinary and return the URL
const uploadToCloudinary = (req, res, next) => {
  upload.single('avatarUrl')(req, res, async (error) => {
    if (error) {
      next(HttpError(400, 'Failed to upload file to Cloudinary'));
    }
    
    if (req.file) {
      const file = req.file;
      const cloudinaryURL = file.path;
      res.locals.avatarUrl = cloudinaryURL;
    }
    
    next();
  });
};

module.exports = {
  uploadToCloudinary
};

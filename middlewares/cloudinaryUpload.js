const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { HttpError } = require('../helpers')
const { Background } = require('../models/background')
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env

// Cloudinary configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png'], // Specify the allowed file formats
    },
})
const upload = multer({ storage })

// Upload file to Cloudinary and return the URL
const uploadToCloudinary = (req, res, next) => {
    upload.single('avatarUrl')(req, res, async (error) => {
        if (error) {
            next(HttpError(400, 'Failed to upload file to Cloudinary'))
        }

        if (req.file) {
            const file = req.file
            const cloudinaryURL = file.path
            res.locals.avatarUrl = cloudinaryURL
        }

        next()
    })
}

const getImages = async (folder) => {
    try {
        let resources = []
        let maxResults = 50
        let nextCursor = null
        let totalCount = 0

        do {
            // Retrieve the background images from Cloudinary
            const result = await cloudinary.search
                .expression(`public_id:${folder}*`)
                .max_results(maxResults)
                .next_cursor(nextCursor)
                .execute()

            resources = resources.concat(result.resources)
            nextCursor = result.next_cursor
            totalCount = result.total_count
        } while (resources.length < totalCount)

        return resources
    } catch (error) {
        console.error('Error retrieving images:', error)
        throw error
    }
}

const initializBackgrounds = async () => {
    try {
        let resources = await getImages('background')
        const thumbnailImages = resources.filter(
            (resource) => resource.folder === 'background/thumbnail'
        )

        const imageObjects = []

        for (const thumbnailImage of thumbnailImages) {
            const thumbnailUrl = thumbnailImage.secure_url
            const filename = thumbnailImage.filename

            // Retrieve the images for different devices and resolutions
            const images = {
                mobileUrl_1x: getImageUrl(
                    resources,
                    filename,
                    'background/mobile/x1'
                ),
                mobileUrl_2x: getImageUrl(
                    resources,
                    filename,
                    'background/mobile/x2'
                ),
                tabletUrl_1x: getImageUrl(
                    resources,
                    filename,
                    'background/tablet/x1'
                ),
                tabletUrl_2x: getImageUrl(
                    resources,
                    filename,
                    'background/tablet/x2'
                ),
                desktopUrl_1x: getImageUrl(
                    resources,
                    filename,
                    'background/desktop/x1'
                ),
                desktopUrl_2x: getImageUrl(
                    resources,
                    filename,
                    'background/desktop/x2'
                ),
                thumbnail: thumbnailUrl,
            }

            imageObjects.push(images)
        }
        Background.create(imageObjects)
    } catch (error) {
        console.error('Error retrieving background images:', error)
    }
}

const getImageUrl = (resources, filename, folder) => {
    const image = resources.find(
        (resource) =>
            resource.folder === folder && resource.filename === filename
    )
    return image ? image.secure_url : ''
}

module.exports = {
    uploadToCloudinary,
    initializBackgrounds,
}

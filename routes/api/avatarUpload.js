const multer = require('multer')
const path = require('path')

const destinationDir = path.join(process.cwd(), 'temp')

const multerConfig = multer.diskStorage({
  destination: destinationDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const avatarUpload = multer({
  storage: multerConfig,
})

module.exports = { avatarUpload }
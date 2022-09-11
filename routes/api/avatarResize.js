const jimp = require('jimp')

const avatarResize = (req, res, next) => {
  const { path } = req.file
  jimp.read(path)
    .then(avatar => {
      avatar.resize(250, 250)
      avatar.write(path)
      next()
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { avatarResize }
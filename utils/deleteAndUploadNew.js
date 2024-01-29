const s3 = require("./s3")
const unifyPath = require("./unifyPath")

const deleteAndUploadNew = async (slide1, bannerField, req, index) => {
  const banner = decodeURI(slide1.dataValues[bannerField])
  let params = {
    Bucket: 'acs-beauty-bucket',
    Key: `slide/${banner.slice(banner.lastIndexOf('/') + 1)}`,
  }
  // console.log('deleted slide = ', `slide/${desktopBanner.slice(desktopBanner.lastIndexOf('/') + 1)}`)
  s3.deleteObject(params).promise()

  params = {
    Body: req.files[index].buffer,
    Bucket: 'acs-beauty-bucket',
    Key: `slide/${unifyPath(req, index)}`,
  }
  const data = await s3.upload(params).promise()

  slide1[bannerField] = decodeURI(data.Location)
}

module.exports = deleteAndUploadNew

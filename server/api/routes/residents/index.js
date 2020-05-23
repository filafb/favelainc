const epxress = require("express")
const router = epxress.Router()
const { fork } = require("child_process")
const path = require("path")
const multer = require("multer")
const upload = multer()
const { verifyAdmin } = require("../helpers")

module.exports = router

router.use(upload.single("file"))

router.post("/upload/batch", verifyAdmin, (req, res, next) => {
  const { file } = req
  try {
    if (file) {
      const createResidentsBatch = fork(
        path.join(__dirname, "../../childProcess", "batchResidents.js")
      )
      createResidentsBatch.send({ file: file.buffer.toString() })
      createResidentsBatch.on("message", message => {
        createResidentsBatch.kill()
        if (message.error) {
          res.status(400).json(message)
        } else {
          res.json(message)
        }
      })
    } else {
      throw new Error("file not attached")
    }
  } catch (error) {
    error.status = 400
    next(error)
  }
})

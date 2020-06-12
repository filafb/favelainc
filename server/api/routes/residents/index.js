const epxress = require("express")
const router = epxress.Router()
const { fork } = require("child_process")
const path = require("path")
const multer = require("multer")
const upload = multer()
const { verifyAdmin } = require("../helpers")
const { Family, Resident } = require("../../../db")

module.exports = router

router.use(upload.single("file"))

router.get("/", async (req, res, next) => {
  try {
    const userOrg = await req.user.getNgoPartner()
    const queryParams = userOrg.master ? {} : { ngoPartnerId: userOrg.id }
    const residents = await Resident.findAll({
      include: {
        model: Family,
        where: queryParams
      }
    })
    res.json(residents)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  const {
    familyDetails: { newFamily, ngoPartnerId, familyId },
    ...resident
  } = req.body

  // if user is not under master, and try to create a resident using another partner Id, it should fail
  if (!req.user.ngoPartner.master && req.user.ngoPartner.id !== ngoPartnerId) {
    res.status(401).json({
      error: "Usuário não autorizado a criar família para organização informada"
    })
    return
  }
  try {
    let family
    if (newFamily) {
      family = await Family.create({ ngoPartnerId })
    } else {
      family = await Family.findByPk(familyId)
    }
    const newResident = await Resident.create(resident)
    await newResident.setFamily(family)
    res.send(newResident)
  } catch (error) {
    next(error)
  }
})

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

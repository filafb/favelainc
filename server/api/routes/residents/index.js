const epxress = require("express")
const router = epxress.Router()
const { fork } = require("child_process")
const path = require("path")
const multer = require("multer")
const upload = multer()
const { verifyAdmin, belongsToMaster } = require("../helpers")
const { Family, Resident } = require("../../../db")

module.exports = router

router.use(upload.single("file"))

router.get("/", async (req, res, next) => {
  if (req.query.cpf) {
    try {
      const resident = await Resident.findOne({
        where: {
          cpf: req.query.cpf
        },
        include: {
          model: Family
        }
      })
      if (resident) {
        res.json(resident)
      } else {
        res.json({ message: "CPF não encontrado" })
      }
    } catch (error) {
      next(error)
    }
  } else {
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
  }
})

router.get("/:id/relatives", async (req, res, next) => {
  const { id } = req.params
  try {
    const userOrg = await req.user.getNgoPartner()
    const queryParams = userOrg.master ? {} : { ngoPartnerId: userOrg.id }
    const resident = await Resident.findByPk(id, {
      include: {
        model: Family,
        where: queryParams
      }
    })
    const relatives = await resident.getRelatives()
    res.json([resident, ...relatives])
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
    const newResident = await Resident.create(resident)
    let family
    if (newFamily) {
      family = await Family.create({ ngoPartnerId })
    } else {
      family = await Family.findByPk(familyId)
    }
    await newResident.setFamily(family)
    const updateResident = await Resident.findByPk(newResident.id, {
      include: {
        model: Family
      }
    })
    res.send(updateResident)
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

router.delete("/:id", belongsToMaster, verifyAdmin, async (req, res, next) => {
  const { id } = req.params
  try {
    await Resident.destroy({
      where: {
        id
      }
    })
    res.json({ success: "User deleted" })
  } catch (error) {
    next(error)
  }
})

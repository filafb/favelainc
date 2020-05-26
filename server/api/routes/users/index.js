const express = require("express")
const router = express.Router()
const { User, NgoPartner } = require("../../../db")
const { verifyAdmin } = require("../helpers")

module.exports = router

async function checkAllowToUpdate(req, res, next) {
  try {
    // check for user updating theirselves
    const userToUpdate = await User.findOne({
      where: { email: req.body.email }
    })
    res.locals.foundUser = userToUpdate
    if (!userToUpdate) {
      res.status(404).json({ error: "User not found" })
    } else if (
      req.user &&
      req.user.id === userToUpdate.id &&
      req.user.email === userToUpdate.email
    ) {
      next()
      // check user asking for update is admin and user being updated is not admin
    } else if (req.user && req.user.admin && !userToUpdate.admin) {
      next()
    } else {
      res.status(401).json({ error: "Não autorizado" })
    }
  } catch (e) {
    next(e)
  }
}

router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({ include: NgoPartner })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post("/create", verifyAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(401).json({ error: "Email já utilizado" })
    } else {
      next(e)
    }
  }
})

router.put("/update", checkAllowToUpdate, async (req, res, next) => {
  try {
    const user = await res.locals.foundUser.update(req.body)
    res.json(user)
  } catch (e) {
    next(e)
  }
})

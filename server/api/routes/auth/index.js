const express = require("express")
const router = express.Router()
const { User } = require("../../../db")

module.exports = router

function verifyAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    next()
  } else {
    res.status(401).json({ error: "Não autorizado" })
  }
}

router.post("/login", async (req, res, next) => {
  const { email = "", password = "" } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).json({ error: "Email não encontrado" })
    } else if (!user.correctPassword(password)) {
      res.status(401).json({ error: "Senha incorreta" })
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (e) {
    next(e)
  }
})

router.post("/create", verifyAdmin, async (req, res, next) => {
  const { firstName, lastName, email, password, admin } = req.body
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      admin
    })
    res.status(201).json(user)
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(401).json({ error: "Email já utilizado" })
    } else {
      next(e)
    }
  }
})

router.post("/logout", (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect("/")
})

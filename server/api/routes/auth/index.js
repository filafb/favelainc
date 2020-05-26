const express = require("express")
const router = express.Router()
const { User, NgoPartner } = require("../../../db")

module.exports = router

router.put("/login", async (req, res, next) => {
  const { email = "", password = "" } = req.body
  try {
    const user = await User.findOne({ where: { email }, include: NgoPartner })
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

router.delete("/logout", (req, res) => {
  req.logout()
  req.session.destroy()
  res.end()
})

router.get("/me", (req, res) => {
  res.send(req.user)
})

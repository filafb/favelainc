const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("./routes/helpers")

//any route plugged here are already mounted on `/api`
router.use("/auth", require("./routes/auth"))
router.use(isLoggedIn)
router.use("/users", require("./routes/users"))
router.use("/residents", require("./routes/residents"))
router.use("/ngo-partners", require("./routes/ngoPartners"))
router.use("/residents", require("./routes/residents"))
router.use("/families", require("./routes/families"))

//handleling 404
router.use((req, res, next) => {
  const err = new Error("Not found.")
  err.status = 404
  next(err)
})

module.exports = router

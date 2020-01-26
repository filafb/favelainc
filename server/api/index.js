const express = require("express")
const router = express.Router()

//any route plugged here are already mounted on `/api`

//handleling 404
router.use((req, res, next) => {
  const err = new Error("Not found.")
  err.status = 404
  next(err)
})

module.exports = router

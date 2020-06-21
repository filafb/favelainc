const express = require("express")
const router = express.Router()
const { Family } = require("../../../db")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const families = await Family.findAll()
    res.json(families)
  } catch (error) {
    next(error)
  }
})

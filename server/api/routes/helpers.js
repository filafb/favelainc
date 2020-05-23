function verifyAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    next()
  } else {
    res.status(401).json({ error: "Não autorizado" })
  }
}

module.exports = {
  verifyAdmin
}

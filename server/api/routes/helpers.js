function verifyAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    next()
  } else {
    res.status(401).json({ error: "Não autorizado" })
  }
}

function belongsToMaster(req, res, next) {
  if (req.user && req.user.ngoPartner && req.user.ngoPartner.master) {
    next()
  } else {
    res.status(401).json({ error: "Não autorizado" })
  }
}

module.exports = {
  verifyAdmin,
  belongsToMaster
}

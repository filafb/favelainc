const express = require("express")
const path = require("path")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const session = require("express-session")
const { db, NgoPartner } = require("./db")
const passport = require("passport")
const compression = require("compression")
const PORT = process.env.PORT || 4321

//config to store session
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const dbStore = new SequelizeStore({ db: db })

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id, {
      include: NgoPartner
    })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

//loggin middleware
const createApp = () => {
  app.use(morgan("dev"))

  app.use(compression())

  //body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  //session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "superSecret or not",
      store: dbStore,
      resave: false,
      saveUninitialized: false
    })
  )

  //
  app.use(passport.initialize())
  app.use(passport.session())

  app.use("/api", require("./api"))

  // static middleware
  app.use(express.static(path.join(__dirname, "../public")))

  //if someone enters an invalid URI, will be redirect to index.html
  //make sure it's bellow any other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"))
  })

  // Handle 500 Errors
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal server error." })
  })
}

const startListening = () => {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
}

async function bootApp() {
  await dbStore.sync()
  await createApp()
  await startListening()
}

async function bootForTest() {
  await dbStore.sync({ force: true })
  createApp()
}

if (require.main === module) {
  bootApp()
} else {
  bootForTest()
}

module.exports = app

const request = require("supertest")
const app = require("../../../../index")
const { User } = require("../../../../db")

describe("/api/auth handles authentication", () => {
  const user = {
    firstName: "Dwight",
    lastName: "Schrute",
    email: "d.Schrute@dundermifflin.com",
    password: "MichaelScott",
    admin: true
  }

  const nonAdmin = {
    firstName: "Andrew",
    lastName: "Bernard",
    email: "andy@cornell.com",
    password: "cornell",
    admin: false
  }

  beforeEach(async () => {
    await User.create(user)
    await User.create(nonAdmin)
  })

  afterEach(async () => {
    await User.destroy({ truncate: true, cascade: true })
  })

  describe("a POST request to /login", () => {
    test("returns user info when user exist and password is correct", async () => {
      const { body, status } = await request(app)
        .post("/api/auth/login")
        .send({ email: user.email, password: user.password })
      expect(status).toBe(200)
      expect(body.email).toBe(user.email)
    })

    test("returns an error when email doesn't exist", async () => {
      const { body, status } = await request(app)
        .post("/api/auth/login")
        .send({ email: "wrong@email.com", password: user.password })
      expect(status).toBe(401)
      expect(body.error).toBe("Email não encontrado")
    })

    test("returns an error when password is wrong", async () => {
      const { body, status } = await await request(app)
        .post("/api/auth/login")
        .send({ email: user.email, password: "wrong password" })
      expect(status).toBe(401)
      expect(body.error).toBe("Senha incorreta")
    })
  })

  describe("a POST to /create", () => {
    const newUser = {
      firstName: "Pamela",
      lastName: "Beesly",
      email: "Beesly@dundermifflin.com",
      password: "JHS2",
      admin: false
    }

    test("returns an error if request is made by a non logged user", async () => {
      const { status, body } = await request(app)
        .post("/api/auth/create")
        .send(newUser)
      expect(status).toBe(401)
      expect(body.error).toBe("Não autorizado")
    })

    test("returns the new user created when request is made by an admin", async () => {
      const { header } = await request(app)
        .post("/api/auth/login")
        .send({ email: user.email, password: user.password })
      const cookie = header["set-cookie"]
      const { status, body } = await request(app)
        .post("/api/auth/create")
        .set("Cookie", cookie)
        .send(newUser)
      expect(status).toBe(201)
      expect(body.email).toBe(newUser.email)
    })

    test("returns an error if request is mabe by a non admin user", async () => {
      const { header } = await request(app)
        .post("/api/auth/login")
        .send({ email: nonAdmin.email, password: nonAdmin.password })
      const cookie = header["set-cookie"]
      const { status, body } = await request(app)
        .post("/api/auth/create")
        .set("Cookie", cookie)
        .send(newUser)
      expect(status).toBe(401)
      expect(body.error).toBe("Não autorizado")
    })

    test("doesn't allow to create an user using an email already in use", async () => {
      const { header } = await request(app)
        .post("/api/auth/login")
        .send({ email: user.email, password: user.password })
      const cookie = header["set-cookie"]
      const { status, body } = await request(app)
        .post("/api/auth/create")
        .set("Cookie", cookie)
        .send(nonAdmin)
      expect(status).toBe(401)
      expect(body.error).toBe("Email já utilizado")
    })
  })
})

const request = require("supertest")
const app = require("../../../../index")
const { User } = require("../../../../db")

describe("/api/auth handles authentication", () => {
  describe("a POST request to /login", () => {
    const user = {
      firstName: "Dwight",
      lastName: "Schrute",
      email: "d.Schrute@dundermifflin.com",
      password: "MichaelScott",
      admin: true
    }

    beforeEach(async () => {
      await User.create(user)
    })

    afterEach(async () => {
      await User.destroy({ truncate: true, cascade: true })
    })

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

  describe("a post to /create", () => {
    const newUser = {
      firstName: "test",
      lastName: "test",
      email: "email@test.com",
      password: "nope",
      admin: false
    }

    test("returns an error if request is made by a non logged user", async () => {
      const { status, body } = await request(app)
        .post("/api/auth/create")
        .send(newUser)
      expect(status).toBe(401)
      expect(body.error).toBe("Usuário não autorizado")
    })
  })
})

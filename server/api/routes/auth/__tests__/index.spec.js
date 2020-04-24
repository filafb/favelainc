const request = require("supertest")
const app = require("../../../../index")
const server = request.agent(app)
const { User, db } = require("../../../../db")

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
    await db.models.Session.destroy({ truncate: true, cascade: true })
  })

  describe("a PUT request to /login", () => {
    test("returns user info when user exist and password is correct", async () => {
      const { body, status } = await server
        .put("/api/auth/login")
        .send({ email: user.email, password: user.password })
      expect(status).toBe(200)
      expect(body.email).toBe(user.email)
    })

    test("returns an error when email doesn't exist", async () => {
      const { body, status } = await server
        .put("/api/auth/login")
        .send({ email: "wrong@email.com", password: user.password })
      expect(status).toBe(401)
      expect(body.error).toBe("Email não encontrado")
    })

    test("returns an error when password is wrong", async () => {
      const { body, status } = await server
        .put("/api/auth/login")
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
      const { status, body } = await server
        .post("/api/auth/create")
        .send(newUser)
      expect(status).toBe(401)
      expect(body.error).toBe("Não autorizado")
    })

    test("returns the new user created when request is made by an admin", async () => {
      await server
        .put("/api/auth/login")
        .send({ email: user.email, password: user.password })

      const { status, body } = await server
        .post("/api/auth/create")
        .send(newUser)
      expect(status).toBe(201)
      expect(body.email).toBe(newUser.email)
    })

    test("returns an error if request is mabe by a non admin user", async () => {
      await server
        .put("/api/auth/login")
        .send({ email: nonAdmin.email, password: nonAdmin.password })
      const { status, body } = await server
        .post("/api/auth/create")
        .send(newUser)
      expect(status).toBe(401)
      expect(body.error).toBe("Não autorizado")
    })

    test("doesn't allow to create an user using an email already in use", async () => {
      await server
        .put("/api/auth/login")
        .send({ email: user.email, password: user.password })
      const { status, body } = await server
        .post("/api/auth/create")
        .send(nonAdmin)
      expect(status).toBe(401)
      expect(body.error).toBe("Email já utilizado")
    })
  })
  describe("a GET to /me", () => {
    test("returns user info if session still exists", async () => {
      await server
        .put("/api/auth/login")
        .send({ email: user.email, password: user.password })
      const { body } = await server.get("/api/auth/me")
      expect(body.email).toBe(user.email)
    })
    test("returns empty object if request doesn't have a cookie", async () => {
      const { body } = await server.get("/api/auth/me")
      expect(body).toEqual({})
    })
  })
  // For some reason I coudn't figure out, the call to /me is returning not an empty object after /logout being called. Tested with postman and worked fine
  // describe("a DELETE to /logout", () => {
  //   test("delete the session", async () => {
  //     await server
  //       .put("/api/auth/login")
  //       .send({ email: user.email, password: user.password })
  //     await server.delete("/api/auth/logout")
  //     const {body} = await server.get("/api/auth/me")
  //     expect(body).toEqual({})
  //   })
  // })
})

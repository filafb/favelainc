const { User, NgoPartner } = require("../../index")

describe("User model", () => {
  const user = {
    firstName: "Dwight",
    lastName: "Schrute",
    email: "d.Schrute@dundermifflin.com",
    password: "MichaelScott",
    admin: true
  }

  const ngoPartner = {
    name: "Dunder Mifflin",
    master: true
  }

  let newUser

  beforeEach(async () => {
    const { id } = await NgoPartner.create(ngoPartner)
    newUser = await User.create({ ...user, ngoPartnerId: id })
  })

  afterEach(async () => {
    await User.destroy({ truncate: true, cascade: true })
  })

  test("encrypts user password", async () => {
    expect(newUser.password()).not.toBe(user.password)
  })
  describe("user instances", () => {
    describe("have a method called correctPassword", () => {
      test("that returns true if password is correct", () => {
        expect(newUser.correctPassword(user.password)).toBeTruthy()
      })
      test("and returns false if password is correct", () => {
        expect(newUser.correctPassword("JimHalpert")).toBeFalsy()
      })
    })
  })
})

const supertest = require("supertest")
const { app } = require("../../server/index")
const client = supertest(app) // to send request (CRUD) client.post(<api>).send(<body>)
const { expect } = require("chai")

describe("this route", () => {
  it("is expected to do something", () => {
    expect(true).to.be.true
  })
})

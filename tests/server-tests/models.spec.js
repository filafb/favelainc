const { db } = require("../../server/db")
const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require("chai-as-promised") //await expect to.be rejected
chai.use(chaiAsPromised)

describe("this model", () => {
  it("is expected to to something", () => {
    expect(true).to.be.true
  })
})

const familiesDetails = require("../results/familiesDetails.json")
const { Family } = require("../../server/db/index")

async function seedFamilies() {
  const errors = []
  for (let i = 0; i < familiesDetails.length; i++) {
    const {
      id,
      familySize,
      children,
      eldery,
      familyIncome,
      familyIncomeCovid,
      governmentBenefit,
      partnerNgo,
      closestNgo,
      consent,
      ...familyDetails
    } = familiesDetails[i]
    try {
      const familySizeParsed = Number(familySize) ? Number(familySize) : 0
      const childrenParsed = Number(children) ? Number(children) : 0
      const elderyParsed = Number(eldery) ? Number(eldery) : 0
      await Family.create({
        ...{
          tempId: id,
          consent: consent
            ? consent.toLowerCase() === "sim"
              ? true
              : false
            : null,
          familySize: familySizeParsed,
          children: childrenParsed,
          eldery: elderyParsed
        },
        ...familyDetails
      })
    } catch (error) {
      console.log(error)
      errors.push(errors)
    }
  }
  console.log(errors.length)
  console.log("Seeded!")
}

seedFamilies()

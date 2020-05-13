const peopleDetails = require("../results/people.json")
const { Resident, Family } = require("../../server/db/index")

async function seedPeople() {
  const errors = []
  for (let i = 0; i < peopleDetails.length; i++) {
    const { familyId, birthDate, ...people } = peopleDetails[i]
    try {
      const birthDateParsed = birthDate ? new Date(birthDate) : null
      const family = await Family.findOne({ where: { tempId: familyId } })
      const newPerson = await Resident.create({
        ...{ birthDate: birthDateParsed },
        ...people
      })
      await newPerson.setFamily(family)
    } catch (error) {
      console.log(errors)
      errors.push(error)
    }
  }
}

seedPeople()

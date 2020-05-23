const { parseCsvToJson, filterFields, compareFields } = require("../../helpers")
const { Resident } = require("../../db")

process.on("message", async ({ file }) => {
  const residentFields = filterFields(Resident)
  const {
    data,
    meta: { fields }
  } = parseCsvToJson(file)
  const { error, missingFields, unrecognizedFields } = compareFields({
    modelFields: residentFields,
    received: fields
  })
  // check if header is in the right format
  if (error) {
    process.send({ error, missingFields, unrecognizedFields })
    return
  }

  try {
    const residents = await Resident.bulkCreate(data, { validate: true })
    process.send({ success: true, created: residents.length })
    return
  } catch (error) {
    // validations errors doesn't add the errors on e.errors. Constrains errors, like unique does
    if (!error.errors && error.length > 0) {
      const createErrors = []
      for (let i = 0; i < error.length; i++) {
        createErrors.push(error[i].errors.errors[0])
      }
      error.errors = createErrors
    }
    process.send({ error: true, errors: error.errors })
    return
  }
})

//error.errors will be an array with objects like: {
//   message: 'cpf must be unique',
//   type: 'unique violation',
//   path: 'cpf',
//   value: '34715672839',
//   origin: 'DB',
//   instance: null,
//   validatorKey: 'not_unique',
//   validatorName: null,
//   validatorArgs: []
// }

async function exe() {
  try {
    const newResident = await Resident.bulkCreate(
      [{ cpf: "34715672839" }, { cpf: "33715672839" }, { cpf: "34715622839" }],
      { validate: true }
    )
    console.log(newResident.length)
  } catch (e) {
    //keep this error style. Will validate -> on error, will create and object. Might need to run the upload twice
    if (!e.errors && e.length > 0) {
      const createErrors = []
      for (let i = 0; i < e.length; i++) {
        createErrors.push(e[i].errors.errors[0])
      }
      e.errors = createErrors
    }
    console.log(e.errors)
  }
}

// exe()

//console.log(checkFields)

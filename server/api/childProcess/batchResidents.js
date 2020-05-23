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

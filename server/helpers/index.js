const Papa = require("papaparse")

const parseCsvToJson = csvFile => {
  return Papa.parse(csvFile, {
    header: true,
    transform: value => (value ? value.trim() : null)
  })
}

const filterFields = Model => {
  const rawFields = Object.keys(Model.fieldRawAttributesMap)

  const fieldsFiltered = rawFields.filter(field => {
    const fieldObject = Model.fieldRawAttributesMap[field]
    if (fieldObject.primaryKey) {
      return false
    } else if (field === "createdAt" || field === "updatedAt") {
      return false
    } else if (fieldObject.references) {
      return false
    } else {
      return true
    }
  })
  return fieldsFiltered
}

const compareFields = ({ received, modelFields }) => {
  const response = {
    error: false,
    missingFields: [],
    unrecognizedFields: []
  }
  response.missingFields = modelFields.filter(
    field => received.indexOf(field) === -1
  )

  response.unrecognizedFields = received.filter(
    field => modelFields.indexOf(field) === -1
  )

  const hasError =
    !!response.missingFields.length || !!response.unrecognizedFields.length

  response.error = hasError

  return response
}

module.exports = {
  parseCsvToJson,
  filterFields,
  compareFields
}

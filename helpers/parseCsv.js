const fs = require("fs")
const path = require("path")
const Papa = require("papaparse")
const checkCpf = /^(?![0]{11})([0-9]{11})$/

const peoplePath = path.resolve(__dirname, "results", "people.json")
const familiesPath = path.resolve(__dirname, "results", "families.json")
const allPeoplePath = path.resolve(__dirname, "allPeople.csv")
const resultPath = path.resolve(__dirname, "./results")
const peopleFamilyDetailsPath = path.resolve(__dirname, "moradores.csv")
const familiesFinal = path.resolve(__dirname, "results", "familiesDetails.json")

class Person {
  constructor(
    cpf,
    firstName,
    lastName,
    birthDate,
    phoneMain,
    phoneComment,
    phoneSecond
  ) {
    this.firstName = firstName || ""
    this.lastName = lastName || ""
    this.birthDate = birthDate || ""
    this.phoneMain = phoneMain || ""
    this.phoneComment = phoneComment || ""
    this.phoneSecond = phoneSecond || ""
    this.cpf = cpf
  }
}

class Family {
  constructor(
    id,
    {
      address,
      number,
      city,
      state,
      neighborhood,
      familySize,
      children,
      eldery,
      occupation,
      familyIncome,
      familyIncomeCovid,
      governmentBenefit,
      governmentBenefitComment,
      partnerNgo,
      closestNgo,
      consent,
      disability
    }
  ) {
    this.id = id
    this.address = address
    this.number = number
    this.city = city
    this.state = state
    this.neighborhood = neighborhood
    this.familySize = familySize
    this.children = children
    this.eldery = eldery
    this.occupation = occupation
    this.familyIncome = familyIncome
    this.familyIncomeCovid = familyIncomeCovid
    this.governmentBenefit = governmentBenefit
    this.governmentBenefitComment = governmentBenefitComment
    this.partnerNgo = partnerNgo
    this.closestNgo = closestNgo
    this.consent = consent
    this.disability = disability
  }
}

const readFamilies = () =>
  new Promise((resolve, reject) => {
    fs.readFile(familiesPath, "utf8", (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })

const readPeople = () =>
  new Promise((resolve, reject) => {
    fs.readFile(peoplePath, "utf8", (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })

const readAllPeople = () =>
  new Promise((resolve, reject) => {
    fs.readFile(allPeoplePath, "utf8", (err, data) => {
      if (err) reject(err)
      const allPeople = Papa.parse(data, { header: true })
      resolve(allPeople)
    })
  })

const readFamiliesDetails = () =>
  new Promise((resolve, reject) => {
    fs.readFile(peopleFamilyDetailsPath, "utf8", (err, data) => {
      if (err) reject(err)
      const familiesDetails = Papa.parse(data, {
        header: true,
        transform: value => value.trim()
      })
      resolve(familiesDetails.data)
    })
  })

const exec = async () => {
  const [families, people, familyDetails] = await Promise.all([
    readFamilies(),
    readPeople(),
    readFamiliesDetails()
  ])
  const familiesId = {}
  const matchCpfAndFamilyId = {}
  let id = 1
  families.forEach(family => {
    familiesId[id] = family
    family.forEach(member => {
      matchCpfAndFamilyId[member] = id
    })
    id++
  })

  const familyIdUpdated = people.map(person => {
    person.familyId = matchCpfAndFamilyId[person.cpf] || id++
    return person
  })

  const finalFamilyDetais = []
  const familiesAlreadyDone = {}
  familyDetails.forEach(person => {
    if (checkCpf.test(person.cpf)) {
      const familyId = matchCpfAndFamilyId[person.cpf] || id++
      matchCpfAndFamilyId[person.cpf] = familyId
      if (!familiesAlreadyDone[familyId]) {
        console.log(person.neighborhood)
        const newFamily = new Family(familyId, person)
        finalFamilyDetais.push(newFamily)
        familiesAlreadyDone[familyId] = true
      }
    }
  })

  const familyWithouDetails = Object.keys(familiesId).filter(
    id => !familiesAlreadyDone[id]
  )
  familyWithouDetails.forEach(familyId => {
    const newFamily = new Family(familyId, {})
    finalFamilyDetais.push(newFamily)
  })

  const partners = []
  const income = []

  finalFamilyDetais.forEach(family => {
    if (income.indexOf(family.familyIncome) === -1) {
      income.push(family.familyIncome)
    }
    if (partners.indexOf(family.partnerNgo) === -1) {
      partners.push(family.partnerNgo)
    }
  })

  console.log(partners)
  console.log(income)

  fs.writeFile(familiesFinal, JSON.stringify(finalFamilyDetais), err => {
    if (err) return console.log("error saving")
    console.log("Done - familydetails")
  })
}
exec()

/**
 * To do
 * 1. Trim white space all families entries.
 * 2. Compare all families if with id in families info
 *
 */

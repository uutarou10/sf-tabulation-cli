import csvImporter from './csvImporter'
import fs from 'fs'

const projects = JSON.parse(fs.readFileSync('../resource/projects.json'))
const juniorHighSchoolProjects = projects.filter((project) => project.section === 'juniorHighSchool')
const highSchoolPresentationProjects = projects.filter((project) => project.section === 'highSchoolPresentation')
const highSchoolCellingProjects = projects.filter((project) => project.section === 'highSchoolCelling')
const clubProjects = projects.filter((project) => project.section === 'club')
const csvData = csvImporter.parse('/Users/uutarou/Desktop/H29隼輝祭表彰データ.csv')
const visitorVotes = JSON.parse(fs.readFileSync('../resource/visitor.json'))

console.log(`企画名 [団体名] : 生徒投票数 + 来場者投票 = 合計`)

// 中学部門
console.log('☆中学部門☆')
const juniorHighSchoolVisitorResult = csvImporter.tabulationCsvVotes(csvData, 'juniorHighSchool')
juniorHighSchoolProjects.forEach((project) => {
  console.log(`${project.projectName} [${project.groupName}] : ${juniorHighSchoolVisitorResult[project.id]}票 + ${visitorVotes[project.id]}票 = ${juniorHighSchoolVisitorResult[project.id] + visitorVotes[project.id]}票`)
})

console.log('\n---')

// 高校発表部門
console.log('☆高校発表部門☆')
const highSchoolPresentationVisitorResult = csvImporter.tabulationCsvVotes(csvData, 'highSchoolPresentation')
highSchoolPresentationProjects.forEach((project) => {
  console.log(`${project.projectName} [${project.groupName}] : ${highSchoolPresentationVisitorResult[project.id]}票 + ${visitorVotes[project.id]}票 = ${highSchoolPresentationVisitorResult[project.id] + visitorVotes[project.id]}票`)
})

console.log('\n---')

// 高校販売部門
console.log('☆高校販売部門☆')
const highSchoolCellingVisitorResult = csvImporter.tabulationCsvVotes(csvData, 'highSchoolCelling')
highSchoolCellingProjects.forEach((project) => {
  console.log(`${project.projectName} [${project.groupName}] : ${highSchoolCellingVisitorResult[project.id]}票 + ${visitorVotes[project.id]}票 = ${highSchoolCellingVisitorResult[project.id] + visitorVotes[project.id]}票`)
})

console.log('\n---')

// 部活・同好会部門
console.log('☆部活・同好会部門☆')
const clubVisitorResult = csvImporter.tabulationCsvVotes(csvData, 'club')
clubProjects.forEach((project) => {
  console.log(`${project.projectName} [${project.groupName}] : ${clubVisitorResult[project.id]}票 + ${visitorVotes[project.id]}票 = ${clubVisitorResult[project.id] + visitorVotes[project.id]}票`)
})

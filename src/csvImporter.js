import fs from 'fs'
const iconv = require('iconv-lite')
const csvSync = require('csv-parse/lib/sync')

/*
[
  {
    ownHrId: 1,
    ownClubIds: [2, 3],
    juniorHighSchool: 1,
    highSchoolPresentation: 5.
    highSchoolSelling: 6,
    club: 10
   },
   ...
]
的な配列を返す。
有効無効の判定は行わない。
0は何もしないやつ。
 */
const parse = (filePath) => {
  const parsedCsvObject = csvSync(iconv.decode(fs.readFileSync(filePath), 'Shift_JIS'))
  const result = []

  parsedCsvObject.forEach((row) => {
    const grade = parseInt(row[2])
    const classNumber = parseInt(row[3])

    // 学年・クラスからクラスの企画番号を引く
    const ownHrId =  findIdByGradeAndClass(grade, classNumber)

    let ownClubIds = []
    for (let i = 0; i < 2; i += 1) {
      let ownClubId = parseInt(row[9 + (i * 2)] + row[10 + (i * 2)])
      if (ownClubId > 99 || ownClubId < 1 || isNaN(ownClubId)) {
        ownClubId = 0
        ownClubIds.push(ownClubId)
      } else {
        ownClubIds.push(ownClubId)
      }
    }

    let juniorHighSchool = parseInt(row[13] + row[14])
    if (juniorHighSchool > 99 || juniorHighSchool < 1 || isNaN(juniorHighSchool)) {
      juniorHighSchool = 0
    }

    let highSchoolPresentation = parseInt(row[15] + row[16])
    if (highSchoolPresentation > 99 || highSchoolPresentation < 1 || isNaN(highSchoolPresentation)) {
      highSchoolPresentation = 0
    }

    let highSchoolCelling = parseInt(row[17] + row[18])
    if (highSchoolCelling > 99 || highSchoolCelling < 1 || isNaN(highSchoolCelling)) {
      highSchoolCelling = 0
    }

    let club = parseInt(row[19] + row[20])
    if (club > 99 || club < 1 || isNaN(club)) {
      club = 0
    }

    result.push({
      ownHrId,
      ownClubIds,
      juniorHighSchool,
      highSchoolPresentation,
      highSchoolCelling,
      club
    })
  })

  return result
}

const findIdByGradeAndClass = (grade, classNumber) => {
  const projects = JSON.parse(fs.readFileSync('../resource/projects.json'))
  const result = projects.filter((project) => {
    return project.gradeNumber === grade
  }).filter((project) => {
    return project.classNumber === classNumber
  })[0]
  return result === undefined ? undefined : result.id
}

const tabulationCsvVotes = (voteObjectArray, section) => {
  const result = {}

  if (section === 'juniorHighSchool' || section === 'highSchoolPresentation' || section === 'highSchoolCelling') {
    voteObjectArray.forEach((vote) => {
      // vote[section] にはsectionに対する投票の企画番号が入っている
      if (vote[section] !== 0 && vote.ownHrId !== undefined && vote[section] !== vote.ownHrId) {
        if (result[[vote[section]]]) {
          result[[vote[section]]] = result[[vote[section]]] + 1
        } else {
          result[[vote[section]]] = 1
        }
      }
    })
  } else if (section === 'club') {
    voteObjectArray.forEach((vote) => {
      if (vote[section] !== 0 && vote[section] !== vote.ownClubIds[0] && vote[section] !== vote.ownClubIds[1]) {
        if (result[[vote[section]]]) {
          result[[vote[section]]] = result[[vote[section]]] + 1
        } else {
          result[[vote[section]]] = 1
        }
      }
    })
  }

  return result
}

export default {
  parse,
  tabulationCsvVotes
}

// console.log(tabulationCsvVotes(parse('/Users/uutarou/Desktop/H29隼輝祭表彰データcopy.csv'), 'club'))
// console.log( findIdByGradeAndClass(2,3))

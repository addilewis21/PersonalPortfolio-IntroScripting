import { senators } from '../data/senators.js'
import {representatives} from '../data.respresentatives.json'

const members = [...senators, ...representatives]

console.log(members.length)

const senatorDiv = document.querySelector('.senators')

function SimplifiedSenators(chamberFilter) {
  const filteredArray = members.filter(member => member.short_title === chamberFilter : members)
 
  return senators.map(senator => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      seniority: +senator.seniority,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    }
  })
}

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach(senator => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
  })
}

// const filterSenators = (prop, value) => SimplifiedSenators().filter(senator => senator[prop] === value)

// //console.log(filterSenators('gender', 'F'))

const mostSeniorMember = SimplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

console.log(mostSeniorMember)

const mostLoyal = SimplifiedSenators().reduce((acc, senator) => {
  if (senator.loyaltyPct === 100) {
    acc.push(senator)
  }
  return acc
}, [])

console.log(mostLoyal)

populateSenatorDiv(SimplifiedSenators())
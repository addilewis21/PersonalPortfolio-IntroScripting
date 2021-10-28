import { starships } from "../data/starships.js";

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navlist')
const shipView = document.querySelector('displaySection')

function populateView(starships){
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
         let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

populateNav(starships)

function populateShipView(shipData){
    console.log('THanks for lcikling on ${`shipData.name`}')
    let shipImage = document.createElement('img')
    shipImage.src = 'https://starwars-visualguide.com/assets/img/starships/15.jpg'
}
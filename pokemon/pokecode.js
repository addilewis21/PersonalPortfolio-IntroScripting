import { removeChildren } from '../utils/index.js'

function getAPIData(url) {
    try {
      return fetch(url).then((data) => data.json())
    } catch (error) {
      console.error(error)
    }
  }


  let loadedPokemon = []

 function loadPokemon(offset = 10, limit = 25) {
      getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then(async(data) => 
      {
        for (const pokemon of data.results) {
        await  getAPIData(pokemon.url).then(pokeData => {
          loadedPokemon.push(pokeData)
          populatePokeCard(pokeData)
        })
    }
  })
}

// const allPokemon = getAllSimplePokemon()

// function getAllSimplePokemon() {
//   const allPokemon = []
//   getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`).then(
//     async (data) => {
//       console.log(data.results.length) 
//       for (const pokemon of data.results) {
//         await getAPIData(pokemon.url).then((pokeData) => {
//           const mappedPokemon = {
//             abilities: pokeData.abilities,
//             height: pokeData.height,
//             id: pokeData.id,
//             name: pokeData.name,
//             types: pokeData.types,
//             weight: pokeData.weight,
//           }
//           allPokemon.push(mappedPokemon)
//         })
//       }
//     },
//   )
//   return allPokemon
// }

// function getAllPokemonByType(type) {
//   return allPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
// }

// const grassButton = document.querySelector('.grassButton')
// grassButton.addEventListener('click', () => {
//   const allByType = getAllPokemonByType('grass')
//   allByType.forEach((item) => populatePokeCard(item))
// })


const chooseButton = document.querySelector(".choosePokemon")

chooseButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  let id = prompt('What is the ID of your Pokemon?')
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${id}`).then((chosen) =>
  populatePokeCard(chosen)
  )
})
  const pokeGrid = document.querySelector('.pokeGrid')
  const loadButton = document.querySelector('.loadPokemon')
  loadButton.addEventListener('click', () => {
    removeChildren(pokeGrid)
    loadPokemon(75, 25)
        })

  const colorButton = document.querySelector('.colorPokemon')
  colorButton.addEventListener('click', () => {
                const domPokemon = document.querySelectorAll('.front')
                domPokemon.forEach((item) => {
                  const domPokeName = item.innerText.toLowerCase()
                  const foundPokemon = loadedPokemon.find((pokemon) =>  pokemon.name === domPokeName)
                  typesBackground(foundPokemon, item)
                })
             })
    


     const newButton = document.querySelector(".newPokemon")
       newButton.addEventListener("click", () => {
           let pokeName = prompt("What is the name of your Pokemon?")
           let pokeHeight = prompt("What is the height of your Pokemon?")
           let pokeWeight = prompt("How many kilograms is your Pokemon?")
            let pokeAbilities = prompt(
              "What abilities does your Pokemon have? (use a comma separated list)"
           )
           let pokeColor = prompt("What type is your Pokemon? Grass, fire, water, or bug? (Choose one, type lowercase)")
             
           let newPokemon = new Pokemon(
              pokeName,
             pokeHeight,
             pokeWeight,
             getAbilitiesArray(pokeAbilities),
             pokeColor
            )
            console.log(newPokemon)
           populatePokeCard(newPokemon)
         })





const morePokemon = document.querySelector('.morePokemon')
morePokemon.addEventListener('click', () => {
    let startPoint = prompt('Which pokemon ID do we start with?')
    let howMany = parseInt(prompt('How many more pokemon do you want to see?'))
    loadPokemon(startPoint, howMany)

})

function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    console.log(tempArray)
    return tempArray.map((abilityName) => {
        return {
            ability: {
                name: abilityName
            }
        }
    })
}

// function getTypesArray(spacedString) {
//   let tempArray = spacedString.split(' ')
//   return tempArray.map((typeName) => {
//     return {
//       type: {
//         name: typeName,
//       },
//     }
//   })
// }

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  if (!pokeType2) {
    card.style.setProperty('background-color', getPokeTypeColor(pokeType1))
  } else {
    card.style.setProperty('background',
    `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
  }
}

function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div")
  pokeScene.className = "scene"
  const pokeCard = document.createElement("div")
  pokeCard.className = "card"
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped")
  })

  const cardFacefront = populateCardFront(singlePokemon)
  const cardFaceback = populateCardBack(singlePokemon)

  pokeCard.appendChild(cardFacefront)
  pokeCard.appendChild(cardFaceback)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}



function populateCardFront(pokemon) {
  const pokeFront = document.createElement('figure')
  pokeFront.className = 'cardFace front'
  const pokeImg = document.createElement('img')
  if (pokemon.id === 9001) {
    pokeImg.src = '../images/pokeball.png'
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  }
  const pokeCaption = document.createElement('figcaption')
  pokeCaption.textContent = `${pokemon.name}`

  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)


  return pokeFront
}


function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
    const pokeTypes = document.createElement('ol')
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement('li')
    typeItem.textContent = pokeType.type.name
    pokeTypes.appendChild(typeItem)
  })

  const pokeHP = document.createElement('h5')
  pokeHP.textContent = `HP: ${pokemon.stats[0].base_stat}`

  pokeBack.appendChild(pokeHP)
pokeBack.appendChild(label)
  pokeBack.appendChild(abilityList);
  pokeBack.appendChild(pokeTypes)
  return pokeBack;
}

class Pokemon {
  constructor(name, height, weight, abilities, color) {
      this.id = 9001,
      this.name = name,
      this.height = height,
      this.weight = weight,
      this.abilities = abilities,
      this.color = color
  }
}

function getPokeTypeColor(pokeType) {
  let color 
  switch (pokeType) {
    case  'bug':
      color = '#A8B820'
      break
    case  'dark':
      color = '#7fff00'
      break
    case  'dragon':
      color = '#7038F8'
      break
    case  'electric':
        color = '#fff01f'
        break
    case  'fairy':
        color = '#EE99AC'
        break
    case  'fighting':
        color = '#C03028'
        break
    case  'fire':
        color = '#F08030'
        break
    case  'flying':
      color = '#00ffff'
      break
    case  'ghost':
      color = '#705898'
      break
    case  'grass':
      color = '#78C850'
      break
    case  'ground':
      color = '#30C068'
      break
    case  'ice':
      color = '#98D8D8'
      break
    case  'normal':
      color = '#A8A878'
      break
    case  'poison':
      color = '#A040A0'
      break
    case  'psychic':
        color = '#F85888'
        break
    case  'rock':
      color = '#B8A038'
      break
    case  'steel':
      color = 'black'
      break
    case  'water':
      color = '#6890F0'
      break
     case  'default':
        color = '#fcde0f'
        break
  }
  return color
}
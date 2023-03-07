  // Wrap pokemonlist into an IIFE
let pokemonRepository = (function() {
// Proteced pokemonlist inside IIFE
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 1.7,
      types: ["Grass, Ground"]
    },
    {
      name: "Shiggy",
      height: 1.3,
      types: ["Water, Fontaine"]
    },
    {
      name: "Mewtoo",
      height: 2.0,
      types: ["Psycho, Fire"]
    },
    {
      name: "Kokuna",
      height: 1.2,
      types: ["Wood"]
    },
    {
      name: "Smettbo",
      height: 3,
      types: ["Wind, Flower"]
    }
  ];

// Function to print out the pokemonlist outside the IIFE
  function getAll() {
    return pokemonList;
  }

// Function to add a new pokemon object to the pokemonlist array
  function add(pokemon) {
      pokemonList.push(pokemon);
  }

// Crate a list item for each new pokemon object
function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokemon-button');
  listItem.appendChild(button);
  list.appendChild(listItem);
}

// Return both functions from pokemonRepository IIFE
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }

})();


// Add a new pokemon object to the pokemonlist
pokemonRepository.add({name: "Charmander", height: 10, types: ["Fire", "Volcano"]})

// ForEach() function to print out the pokemonList
// By using addListItem()
pokemonRepository.getAll().forEach(function(item) {
  return pokemonRepository.addListItem(item);

})

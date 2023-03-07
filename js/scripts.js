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
  function add(item) {
    pokemonList.push(item);
  }
// Return both functions from pokemonRepository IIFE
  return {
    getAll: getAll,
    add: add
  }

})();


// Add a new pokemon object to the pokemonlist
pokemonRepository.add({name: "Charmander", height: 10, types: ["Fire", "Volcano"]})

// ForEach() Loop to print out the pokemonList
pokemonRepository.getAll().forEach(function(item) {
  document.write("<div>" + item.name + " " + item.height + " " +  item.types + " " + "</div>")
})

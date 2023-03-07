

// Create a PokemonList Array
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

// Use a For Loop to print out the PokemonList objects to the DOM
for (let i=0; i< pokemonList.length; i++) {
  document.write("<div>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height +")" + "</div>");
}

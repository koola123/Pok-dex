
// Wrap pokemonlist into an IIFE
let pokemonList = (function() {
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
})();



// ForEach() Loop to print out the pokemonList
pokemonList.forEach(function(item) {
  document.write("<div>" + item.name + " " + item.height + " " +  item.types + " " + "</div>")
})

//
// // For loop to print out the pokemonlist to the DOM by using the document.write built-in function
// for (let i=0; i< pokemonList.length; i++) {
// // If else statement to highlight and print out the pokemon with the tallest height
//   if (pokemonList[i].height > 2.0) {
//     document.write( "<div>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height +")" + ' - Wow, that\'s big!' + "</div>")
//   } else {
//     document.write("<div>" + pokemonList[i].name + " " + "(height: " + pokemonList[i].height +")" + "</div>");
//   }
// }

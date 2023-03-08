  // Wrap pokemonlist into an IIFE
let pokemonRepository = (function() {
// Proteced pokemonlist inside IIFE
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

// Function to load and get all pokemons from the API
    function loadList() {
      return fetch(apiUrl).then((response) => {
        return response.json();
      }).then((data) => {
        data.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          }
          add(pokemon);
        });
      }).catch(function(error) {
        console.log(error);
      })
    }

// Function to load pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(error) {
      console.error(error);
    });
  }


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
  // Console log the pokemon object when clicked
  button.addEventListener('click',function() {showDetails(pokemon)});
  listItem.appendChild(button);
  list.appendChild(listItem);
}

// Show future details ob the passed pokemon object
function showDetails(pokemon) {
  loadDetails(pokemon).then(function(){
    console.log(pokemon);
  })
}

// Return both functions from pokemonRepository IIFE
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  }
})();


// Add a new pokemon object to the pokemonlist
pokemonRepository.add({name: "Charmander", height: 10, types: ["Fire", "Volcano"]})

// ForEach() function to print out the pokemonList
// By using addListItem()
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(item) {
    return pokemonRepository.addListItem(item);
  })
})

  // Wrapping the pokemonlist into an IIFE
let pokemonRepository = (function() {
// Proteced pokemonlist inside the IIFE from Global Variables or Functions outside
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";

  // Creating and adding new elements to the Bootstrap Modal
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    // Empty the Modal Title and Modal Body
    modalTitle.empty();
    modalBody.empty();

    // Creating a new element for the name in the Modal Content
    let nameElement = $('<h3>' + pokemon.name.toUpperCase() + '</h3>');
    // Creating a new img element in the  modal content
    let imageElement = $('<img class="modal-img">');
    imageElement.attr('src', pokemon.imageUrl);
    // Creating a new element for the height in the Modal Content
    let heightElement = $('<p>' + "<strong> Height: </strong>" + pokemon.height + " cm" + '</p>');
    // Creating a new element for the weight in the Modal Content
    let weightElement = $('<p>' + "<strong> Weight: </strong>" + pokemon.weight + " kg" + '</p>');
    // Creating a new element for the types in the Modal Content
    let typesElement = $('<p>' + "<strong> Types: </strong>" + pokemon.types + '</p>');
    // Creating  a new element for the abilities in the Modal Content
    let abilitiesElement = $('<p>' + "<strong> Abilities: </strong>" + pokemon.abilities + '</p>');
    // Adding the new created elements to the Modal object
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

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

// Function to load the pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Adding details to the pokemon item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      for (let i = 0; i <details.types.length; i++) {
         item.types.push(" " + details.types[i].type.name);
       }
       item.abilities = [];
       for (let i = 0; i <details.abilities.length; i++) {
         item.abilities.push(" " + details.abilities[i].ability.name);
       }
      return item;
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

// Create a list item for each new pokemon object
function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  listItem.classList.add('group-list-item');
  let button = document.createElement('button');
  button.innerText = pokemon.name.toUpperCase();
  button.classList.add('btn-primary');
  button.addEventListener('click',function() {showDetails(pokemon)});
  listItem.appendChild(button);
  list.appendChild(listItem);
}

// Show details of the passed pokemon object
function showDetails(pokemon) {
  loadDetails(pokemon).then(function(){
    showModal(pokemon);
  })
}

// Return functions from IIFE
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  }
})();

// ForEach function to print out the pokemon list from the pokemon repository
pokemonRepository.loadList().then(function() {
  // Now all data is loading to the browser!
  pokemonRepository.getAll().forEach(function(item) {
    return pokemonRepository.addListItem(item);
  })
})

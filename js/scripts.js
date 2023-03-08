  // Wrap pokemonlist into an IIFE
let pokemonRepository = (function() {
// Proteced pokemonlist inside IIFE
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=55";

  let modalContainer = document.getElementById('modal-container');

  // Function Show Modal
  function showModal(title, text, img) {
    // Clear all existing modal content
    modalContainer.innerHTML = "";

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerHTML = "X";
    closeButton.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = "height: "+ text;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', img);
    imageElement.setAttribute("width", "200");
    imageElement.setAttribute("height", "200");

    modal.appendChild(closeButton);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // Function Hide Modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    };
  })

  window.addEventListener('keyup', (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains('is-visible')) {
      hideModal();
    };
  })


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
      item.image = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      types = details.types;
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

// Crate a list item for each new pokemon object
function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name.toUpperCase();
  button.classList.add('pokemon-button');
  // Console log the pokemon object when clicked
  button.addEventListener('click',function() {showDetails(pokemon)});
  listItem.appendChild(button);
  list.appendChild(listItem);
}

// Show future details ob the passed pokemon object
function showDetails(pokemon) {
  loadDetails(pokemon).then(function(item){
    showModal(item.name, item.height, item.image);
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

let pokemonRepository = (function() {

//===================*** App global variables ***===================//

    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";

//===================*** Modal ***===================//

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalFooter = $('.modal-footer');

    modalTitle.empty();
    modalBody.empty();
    modalFooter.empty();

    let pokemonName = $('<h2>' + pokemon.name + '</h2>');
    let imageFront = $('<img class="modal-img">');
    imageFront.attr('src', pokemon.imageFrontUrl);
    let imageBack = $('<img class="modal-img">');
    imageBack.attr('src', pokemon.imageBackUrl);

    let heightElement = $('<p>' + "<strong> Height: </strong>" + pokemon.height + " cm" + '</p>');
    let weightElement = $('<p>' + "<strong> Weight: </strong>" + pokemon.weight + " kg" + '</p>');

    let typesElement = $('<p>' + "<strong> Type: </strong>" + pokemon.types + '</p>');
    let abilitiesElement = $('<p>' + "<strong> Abilities: </strong>" + pokemon.abilities + '</p>');

    modalTitle.append(pokemonName);
    modalBody.append(imageFront);
    modalBody.append(imageBack);
    modalFooter.append(heightElement);
    modalFooter.append(weightElement);
    modalFooter.append(typesElement);
    modalFooter.append(abilitiesElement);
  }

//===================*** App ***===================//

  let loadList = () => {
    return fetch(apiUrl).then((response) => {
      return response.json();
    }).then((data) => {
      data.results.forEach((pokemonItem) => {
        let pokemon = {
          name: capitalizeFirstLetter(pokemonItem.name),
          detailsUrl: pokemonItem.url
        }
        add(pokemon);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  let loadDetails = function(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageFrontUrl = details.sprites.front_default;
      pokemon.imageBackUrl = details.sprites.back_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = [];
      for (let i = 0; i <details.types.length; i++) {
         pokemon.types.push(" " + details.types[i].type.name[0].toUpperCase()
         + details.types[i].type.name.slice(1).toLowerCase());

       }
       pokemon.abilities = [];
       for (let i = 0; i <details.abilities.length; i++) {
         pokemon.abilities.push(" " + details.abilities[i].ability.name[0].toUpperCase()
         + details.abilities[i].ability.name.slice(1).toLowerCase());
       }
      return pokemon;
    }).catch(function(error) {
      console.error(error);
    });
  }

  let getAll = function() {
    return pokemonList;
  }

  let add = function(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('Pokemon object is not correct.');
    }
  };

let addListItem = function(pokemon) {
  let list = document.querySelector('.list-group');
  list.classList.add('d-flex', 'flex-direction-row',
   'justify-content-center', 'flex-wrap-reverse');
   let listItem = document.createElement('li');
   listItem.classList.add('list-group-item', 'border-0', 'p-0');
   let button = document.createElement('button');
   button.innerText = capitalizeFirstLetter(pokemon.name);
   button.classList.add('button');
   button.setAttribute('data-target', '#pokemonModal');
   button.setAttribute('data-toggle', 'modal');
   button.addEventListener('click',function() {
    showDetails(pokemon)
  });
  listItem.appendChild(button);
  list.appendChild(listItem);
}

let showDetails = function(pokemon) {
  loadDetails(pokemon).then(function(){
    showModal(pokemon);
  })
}

//===================*** Search bar ***===================//

let searchBar = document.getElementById('searchbar');
searchBar.addEventListener('input', filterList);

function filterList() {
  const filter = searchBar.value.toUpperCase();
  const listItems = document.querySelectorAll('.list-group-item');

  listItems.forEach((pokemon) => {
      let text = pokemon.textContent;
      if (text.toUpperCase().includes(filter)) {
        pokemon.style.display = '';
      }
      else {
        pokemon.style.display =  'none';
      }
  });
}

//===================*** Helper functions ***===================//

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  }
})();

//===================*** Main ***===================//

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(item) {
    return pokemonRepository.addListItem(item);
  })
});

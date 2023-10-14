const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `<a onclick="loadPokemonDetail(${pokemon.number})">
                <li class="pokemon ${pokemon.type}">
                    <div class="pokemonLayout">
                        <span class="number ${pokemon.type} numberBG">#${pokemon.number}</span>
                        
                        <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${pokemon.type}</li>`).join('')}
                        </ol>
                            <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                        </div>
                    </div>
                    <div>
                        <span class="name">${pokemon.name}</span>
                    </div>
                </li>
            </a>`
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens(offset, limit);
    }
    
});
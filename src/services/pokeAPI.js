//Archivo para consumir la api

const BASE_URL = 'https://pokeapi.co/api/v2/';

const mapPokemonList = (pokemon) => {

    const urlParties = pokemon.url.split('/');
    const id = urlParties[urlParties.length - 2];

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
        id: id,
        name: pokemon.name,
        image: imageUrl
    };
};

export const searchPokemon = async (limit = 20, offset = 0) => {
    const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error (`Error http ${response.status}`)
    }

    const data = await response.json();
    return (data.results).map(mapPokemonList);
}

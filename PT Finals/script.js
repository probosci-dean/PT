if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
   navigator.serviceWorker.register('../sw.js').then( () => {
    console.log('Service Worker Registered')
   })
 })
}


function fetchPokemon(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon not found');
      }
      return response.json();
    })
    .then(data => {
      // Populate the page with the Pokémon's data
      document.getElementById('pokemonName').textContent = data.name;

      // Extract and display Pokémon types
      const types = data.types.map(type => type.type.name).join(', ');
      document.getElementById('pokemonTypes').textContent = types;

      // Extract and display Pokémon abilities
      const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
      document.getElementById('pokemonAbilities').textContent = abilities;

      // Display Pokémon sprite
      const spriteUrl = data.sprites.front_default;
      document.getElementById('pokemonSprite').src = spriteUrl;

      document.getElementById('pokemonInfo').style.display = 'block';
    })
    .catch(error => {
      alert('Error: ' + error.message);
      console.error('Error fetching the Pokémon:', error);
    });
}
// Generate a random Pokémon
document.getElementById('fetchRandomButton').addEventListener('click', () => {
  const randomId = Math.floor(Math.random() * 1025) + 1; // 1025 refers to all available Pokemon, including forms
  fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
});

document.getElementById('searchButton').addEventListener('click', () => {
  const searchQuery = document.getElementById('pokemonSearch').value.trim().toLowerCase();
  if (searchQuery) {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
  } else {
    alert('Please enter a Pokémon name or ID!');
  }
});
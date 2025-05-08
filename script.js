
console.log(1)const pokemonSearch = document.getElementById("pokemonSearch");
const SearchBtn = document.getElementById("btn");
const PokeCart = document.getElementById('pokeInsert');
const categoryBtns = document.getElementById('categoryBtns');
const ExtractMoreData = document.getElementById('ExtractMore');
let arr = [];

let idx = 1;

const ExtractPokemon = async () => {
  let promises = [];
  let StorePoke = []
  for (let idx = 1; idx <= idx+20; idx++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${idx}/`).then(res => res.json()));
  }

  try {
      StorePoke = await Promise.all(promises);
      console.log(promises)
  } catch (e) {
    console.error("Failed to fetch Pokémon data:", e);
  }
  arr = [...arr , ...StorePoke];
};
const typeColors = 
{
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    fighting: "#C03028",
    flying: "#A890F0",
    steel: "#B8B8D0",
    dark: "#705848",
};

const insertingToCart = () => {
    console.log("insertingToCart");

    arr.forEach((value) => {
        const type = value.types[0].type.name; 
        const color = typeColors[type] || "#68A090";
        const img = value.sprites.front_default;
        const experence = value.base_experience;
        const idx = value.id.toString().padStart(2, "0");
        const name = value.name;

        const div = document.createElement("div");
        div.className = "poke-item"; 

        div.innerHTML = `
            <div class="cardImg">
                <img src='${img}' alt="pokeitem">
            </div>
            <div class="poke-disc">
                <p id="item_id">#${idx}</p>
                <p class="exp">Exp: ${experence}</p>
            </div>
            <button class="card-item-btn" id="${idx}" style="background:${color}">${name}</button>
        `;


        PokeCart.appendChild(div);
    });
};
const ExtractedCategory =()=>{

   for (const element in typeColors) {
    const newBtn = document.createElement('button');
    newBtn.className = 'category-btn'
    newBtn.textContent = `${element}`;
    newBtn.style.background = `${typeColors[element]}`
    categoryBtns.appendChild(newBtn);
   }

   
}
ExtractMoreData.addEventListener('click', async ()=>{
  
    })

document.addEventListener("DOMContentLoaded", async() => {
  await ExtractPokemon();
  ExtractedCategory()
  insertingToCart();
});

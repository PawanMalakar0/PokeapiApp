const pokemonSearch = document.getElementById("pokemonSearch");
const PokeCart = document.getElementById("pokeInsert");
const categoryBtns = document.getElementById("categoryBtns");
const ExtractMoreData = document.getElementById("ExtractMore");
const PokeSearchbtn = document.getElementById("PokeSearch-btn");
const CardItemBtn = document.querySelector(".card-item-btn");
let arr = [];
let idx = 1;

const typeColors = {
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

PokeCart.addEventListener("click", (e) => {
  
  if(e.target.className === "card-item-btn"){
     let store =  e.target.textContent;
     console.log(store)
  }
});

PokeSearchbtn.addEventListener("click", () => {
  PokeCart.innerHTML = "Not found";
  const storeSearchingData = pokemonSearch.value.trim();
  if (storeSearchingData === "") {
  insertingToCart(arr);
    return;
  }


 fetch(`https://pokeapi.co/api/v2/pokemon/${storeSearchingData}`)
    .then((res) => res.json())
    .then((data) => {

      const type = data?.types[0];

      const color = typeColors[type] || "#68A090";
      console.log(color);
      const img = data?.sprites.front_default;
      const experence = data?.base_experience;
      const ImgIdx = data?.id.toString().padStart(2, "0");
      const name = data?.name;

      const div = document.createElement("div");
      div.className = "poke-item";
      const CardImg = document.createElement("div");
      CardImg.className = "cardImg";
      const ImgTag = document.createElement("img");
      ImgTag.src = img;
      CardImg.appendChild(ImgTag);
      const PokeDisc = document.createElement("div");
      PokeDisc.className = "poke-disc";

      const itemId = document.createElement("p");
      itemId.id = "item_id";
      itemId.textContent = `#${ImgIdx}`;
      const exp = document.createElement("p");
      exp.className = "exp";
      exp.textContent = `Exp: ${experence}`;
      PokeDisc.appendChild(itemId);
      PokeDisc.appendChild(exp);
      const btn = document.createElement("button");
      btn.className = "card-item-btn";
      btn.textContent = name;
      btn.style.background = color;
      btn.style.color = "white";
      btn.id = ImgIdx;
      div.appendChild(CardImg);
      div.appendChild(PokeDisc);
      div.appendChild(btn);
     

      PokeCart.appendChild(div);
    }).catch((error) => {
      console.log("Error fetching Pokémon data: ", error);
      PokeCart.appendChild = "Not found";
    })
 
});

const ExtractPokemon = async (searchArr) => {
  let temp = idx;
  let promises = new Array();
  let stoke = [];
1
  while (idx <= temp + 30) {
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${idx}`).then((res) =>
        res.json()
      )
    );
    stoke = Promise.all(promises);
    idx++;
  }

  try {
    stoke = await Promise.all(promises);
    arr = [...arr, ...stoke];
  } catch (e) {
    console.error("Failed to fetch Pokémon data:-", e);
  }
};
const insertingToCart = (arr) => {
  console.log(arr, " insertingToCart");
  PokeCart.innerHTML = "";

  arr.forEach((value) => {
    const type = value.types[0].type.name;
    const color = typeColors[type] || "#68A090";
    const img = value.sprites.front_default;
    const experence = value.base_experience;
    const ImgIdx = value.id.toString().padStart(2, "0");
    const name = value.name;

   

    //
    const div = document.createElement("div");
      div.className = "poke-item";
      const CardImg = document.createElement("div");
      CardImg.className = "cardImg";
      const ImgTag = document.createElement("img");
      ImgTag.src = img;
      CardImg.appendChild(ImgTag);
      const PokeDisc = document.createElement("div");
      PokeDisc.className = "poke-disc";

      const itemId = document.createElement("p");
      itemId.id = "item_id";
      itemId.textContent = `#${ImgIdx}`;
      const exp = document.createElement("p");
      exp.className = "exp";
      exp.textContent = `Exp: ${experence}`;
      PokeDisc.appendChild(itemId);
      PokeDisc.appendChild(exp);
      const btn = document.createElement("button");
      const AchorTag = document.createElement("a");
      AchorTag.href = `pokemon.html?id=${ImgIdx}`;
      AchorTag.target = "_blank";
      AchorTag.textContent = name;
      AchorTag.style.textDecoration = "none";
      AchorTag.style.color = "white";
      AchorTag.style.fontSize = "1.2rem";
      btn.className = "card-item-btn";
      btn.style.background = color;
      btn.style.color = "white";
      btn.id = ImgIdx;
      btn.appendChild(AchorTag);
      div.appendChild(CardImg);
      div.appendChild(PokeDisc);
      div.appendChild(btn);
    

    

    PokeCart.appendChild(div);
  });
};
const ExtractedCategory = () => {
  for (const element in typeColors) {
    const newBtn = document.createElement("button");
    newBtn.className = "category-btn";
    newBtn.textContent = `${element}`;
    newBtn.style.background = `${typeColors[element]}`;
    newBtn.id = `${element}`;
    categoryBtns.appendChild(newBtn);
    
  }
};

ExtractMoreData.addEventListener("click", async () => {
  await ExtractPokemon();
  insertingToCart(arr);
});

document.addEventListener("DOMContentLoaded", async () => {
  await ExtractPokemon();
  ExtractedCategory();
  insertingToCart(arr);
});
categoryBtns.addEventListener("click", (e) => {
  const target = e.target;
  if (target.className === "category-btn") {
    const category = target.id;
    const filteredArr = arr.filter((item) => {
      return item.types[0].type.name === category;
    });
    PokeCart.innerHTML = "";
    insertingToCart(filteredArr);
  }
});




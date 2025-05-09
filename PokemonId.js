// url searchParams se id lete hain aur params mai store karte hain
const params = new URLSearchParams(window.location.search);
//all pokemon ke filled ki information hai variable mai store kiya hai
const OnPrevious = document.getElementById('OnPrevious');
const OnNext = document.getElementById('OnNext');
let id = params.get("id");
let dataObj = {};

if (id.startsWith("0")) {
  id = id.substring(1);
}

// chaging the container as pokemon type
// pokemon VideoColorSpace
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


const changeBgColor =(color)=>{

  // document element Style will change Root Psudo class
document.documentElement.style.setProperty('--pokemon-background-color',`${color}`) //it will change Document Root Properties 
}



OnNext.onclick=()=>{
  let PokeImage = document.getElementById("ImagePokemon"
  );
  
 let ImgUrl = PokeImage.src;
  
 let spriteValues = Object.values(dataObj.sprites).filter(val => typeof val === "string" && val.startsWith("http"));
   let findidx = Object.values(spriteValues).findIndex(k => k ===ImgUrl) +1    // we used this is to find the current img in the display
  
   if(findidx >=spriteValues.length){
       findidx =0;
   }
  let newIndex =  Object.values(spriteValues).at(findidx);
  PokeImage.src = `${newIndex}`
}

//for Previous the images
OnPrevious.onclick=()=>{

  let PokeImage = document.getElementById("ImagePokemon"
  );
  
 let ImgUrl = PokeImage.src;
 let spriteValues = Object.values(dataObj.sprites).filter(val => typeof val === "string" && val.startsWith("http"));
  
   let findidx = spriteValues.findIndex(k => k ===ImgUrl)-1 // we used this is to find the current 
   // img in the display

   if(findidx <= 0){
    findidx =spriteValues.length-1;
}
  let newIndex =  Object.values(spriteValues).at(findidx);
  PokeImage.src = `${newIndex}`
}



const ExtractPokemon = async (idx) => {
  let promise =[];
  promise.push( fetch(`https://pokeapi.co/api/v2/pokemon/${idx}`)
  .then((res) => res.json()))
  try {
     dataObj = await Promise.all(promise);
     dataObj ={...dataObj[0]};
     console.log({...dataObj})
     const BgColor =typeColors[dataObj.types[0].type.name]
     const PokeType =  dataObj.types
     const PokeStats = dataObj.stats
     changeBgColor(BgColor)
     displayPokemonData(dataObj);
     getPokeActivites(PokeType);
     getStatsList(PokeStats)

  } catch (e) {
    console.error("Failed to fetch Pokémon data:-", e);
  }
};

ExtractPokemon(id);
 

 const displayPokemonData =(dataObj) => {
  let PokeExperince = document.getElementById("Experience");
  let PokeName = document.getElementById("Name");
  let PokeWeight = document.getElementById("weight");
  let PokeHeight = document.getElementById("height");
  let PokeMoves = document.getElementById("moves");
  PokeMoves.ariaDisabled = true;
  let PokeImage = document.getElementById("ImagePokemon"
  );
  
  let PokeId = document.getElementById("pokeId");

PokeExperince.innerHTML =`${dataObj.base_experience}`;
PokeHeight.innerHTML = `${dataObj.height}`
PokeWeight.innerHTML = `${dataObj.weight}`
PokeName.innerHTML = `${dataObj.name}`
PokeId.innerHTML = `${dataObj.id}`
PokeImage.src = `${dataObj.sprites.front_default}`


for(let i =0 ;i< dataObj.moves.length ;i++){
  let PokeOption = document.createElement('option');
  PokeOption.value = dataObj.moves.at(i).move.name;
  PokeOption.textContent = `${dataObj.moves.at(i).move.name}`
  PokeOption.id =`${dataObj.moves.at(i)}`

  
  PokeMoves.appendChild(PokeOption)
}
 
 }
 //Type of Pokemon is displayed
 function getPokeActivites(TypeArr) {
const TypeList = document.getElementById('TypeList');
for(const key in TypeArr) {
  
    const slot = TypeArr[key].slot;
    const element = TypeArr[key].type.name;
    console.log(element)
    let li = document.createElement('li');
    li.className ='listItem';
    li.id = `${slot}`
    li.textContent = `${element}`
    TypeList.appendChild(li)
}
 }

 const getStatsList =(StatsArr) =>{
  const StatList = document.getElementById('statsList');
console.log(StatsArr);
for (const key in StatsArr) {

  
     const li = document.createElement('li');
     
    li.textContent = `${StatsArr[key].stat.name}`
    li.id = `${key}`
    li.className = `StatList`;
  console.log(li)
  StatList.appendChild(li)
}
 }





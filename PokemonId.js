// url searchParams se id lete hain aur params mai store karte hain
const params = new URLSearchParams(window.location.search);
//all pokemon ke filled ki information hai variable mai store kiya hai
const OnPrevious = document.getElementById('OnPrevious');
const OnNext = document.getElementById('OnNext');
let id = params.get("id");
let dataObj = {};
console.log(id);

if (id.startsWith("0")) {
  id = id.substring(1);
}
OnNext.onclick=()=>{
  let PokeImage = document.getElementById("ImagePokemon"
  );
  
 let ImgUrl = PokeImage.src;
 console.log(ImgUrl)
  
 let spriteValues = Object.values(dataObj.sprites).filter(val => typeof val === "string" && val.startsWith("http"));
   let findidx = Object.values(spriteValues).findIndex(k => k ===ImgUrl) +1// we used this is to find the current img in the display
  
   if(findidx >=spriteValues.length){
       findidx =0;
   }
  let newIndex =  Object.values(spriteValues).at(findidx);
  PokeImage.src = `${newIndex}`
}
OnPrevious.onclick=()=>{

  let PokeImage = document.getElementById("ImagePokemon"
  );
  
 let ImgUrl = PokeImage.src;
 console.log(ImgUrl)
 let spriteValues = Object.values(dataObj.sprites).filter(val => typeof val === "string" && val.startsWith("http"));
  
   let findidx = spriteValues.findIndex(k => k ===ImgUrl)-1 // we used this is to find the current 
   // img in the display

   console.log(Object.keys(spriteValues).at(findidx-1))
   if(findidx <= 0){
    findidx =spriteValues.length-1;
}
  let newIndex =  Object.values(spriteValues).at(findidx);
  console.log(newIndex);
  PokeImage.src = `${newIndex}`
}



const ExtractPokemon = async (idx) => {
  let promise =[];
  promise.push( fetch(`https://pokeapi.co/api/v2/pokemon/${idx}`)
  .then((res) => res.json()))
  try {
     dataObj = await Promise.all(promise);
     dataObj ={...dataObj[0]};
     console.log(dataObj);
     displayPokemonData(dataObj);

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
console.log(PokeHeight);
PokeWeight.innerHTML = `${dataObj.weight}`
console.log(PokeWeight);
PokeName.innerHTML = `${dataObj.name}`
console.log(PokeName);
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





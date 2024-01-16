const effectivenessMatrix = {
    'Grass': ['Water', 'Ground', 'Rock'], 
    'Water': ['Fire', 'Ground', 'Rock'], 
    'Fire': ['Grass', 'Bug', 'Ice', 'Steel'], 
    'Normal': ['None'], 
    'Fighting': ['Normal', 'Steel', 'Ice', 'Rock', 'Dark'], 
    'Electric': ['Water', 'Flying'], 
    'Flying': ['Fighting', 'Grass', 'Bug'], 
    'Ground': ['Electric', 'Fire', 'Poison', 'Rock', 'Steel'], 
    'Rock':['Fire', 'Ice', 'Flying', 'Bug'], 
    'Psychic': ['Fighting', 'Poison'], 
    'Ghost': ['Psychic', 'Ghost'], 
    'Dark': ['Psychic', 'Ghost'], 
    'Bug': ['Grass', 'Psychic', 'Dark'], 
    'Poison': ['Grass', 'Fairy'], 
    'Steel':['Ice', 'Rock', 'Fairy'], 
    'Ice': ['Grass', 'Ground', 'Flying', 'Dragon'], 
    'Dragon': ['Dragon'], 
    'Fairy': ['Dragon', 'Fighting', 'Dark']}

const weaknessMatrix = {
    'Grass': ['Grass', 'Dragon', 'Steel', 'Bug', 'Fire', 'Flying', 'Poison'], 
    'Water': ['Water', 'Grass','Dragon'], 
    'Fire': ['Fire','Water', 'Rock','Dragon'], 
    'Normal': ['Rock',' Steel'], 
    'Fighting': ['Poison', 'Flying', 'Psychic', 'Bug', 'Fairy'], 
    'Electric': ['Grass','Electric','Ground', 'Dragon'], 
    'Flying': ['Eletric', 'Rock','Steel'], 
    'Ground': ['Grass','Bug'], 
    'Rock':['Fighting', 'Ground','Steel'], 
    'Psychic': ['Psychic','Dark','Steel'], 
    'Ghost': ['Dark'], 
    'Dark': ['Fighting', 'Dark', 'Fairy'], 
    'Bug': ['Fire', 'Fighting', 'Poison', 'Flying', 'Ghost','Steel', 'Fairy'], 
    'Poison': ['Poison', 'Ground', 'Rock', 'Ghost', 'Steel'], 
    'Steel':['Fire', 'Water', 'Electric', 'Steel'], 
    'Ice': ['Fire','Water', 'Steel'], 
    'Dragon': ['Steel','Fairy'], 
    'Fairy': ['Fire','Poison','Steel']}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRealHeight(height){
    return height/10;
}

function getRealWeight(weight){
    return weight/10;
}

function appendTypes(typesList){
    num = typesList.length

    /*Initialize with first value */
    type.innerText = ` ${capitalizeFirstLetter(typesList[0]['type']['name'])}`;
    if (num>1) {
        type.innerText += ","
    }
    
    /* If theres more than one value, keep going */
    for (var i=1; i<num; i++){
        type.innerText += ` ${capitalizeFirstLetter(typesList[i]['type']['name'])}`;
        if (i != num-1){
            type.innerText += ",";
        }
    }
}

function appendAbilities(abilityList){
    num = abilityList.length

     /*Initialize with first value */
    ability.innerText = ` ${abilityList[0]['ability']['name']}`;
    if (num>1) {
        ability.innerText += ","
    }

    /* If theres more than one value, keep going */
    for (var i= 1; i<num; i++){
        if (abilityList[i]['is_hidden'] == true){
            ability.innerText += ` ${abilityList[i]['ability']['name']} (hidden)`;
        }else{
            ability.innerText += ` ${abilityList[i]['ability']['name']}`;
        }
        if (i != num-1){
            ability.innerText += ",";
        }
    }
}

function appendWeaknessOrEffectiveness(poketype, matrix, element){
    entry = matrix[poketype];
    num = entry.length;

     /*Initialize with first value */
     element.innerText = ` ${entry[0]}`;
     if (num>1) {
         element.innerText += ","
     }

    for (let i=1; i<num; i++){
        element.innerText += ` ${entry[i]}`;
        if (i!=num-1){
            element.innerText += ','
        }
    }
}

const generatorButton = document.getElementById("genButton");
const name = document.getElementById("name");
const type = document.getElementById("type");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const ability = document.getElementById("ability");
const weakness = document.getElementById("weakness");
const effectiveness = document.getElementById("effectiveness");
const image = document.getElementById("image");


function getRandomPokemon(){
    const randomId = Math.ceil(Math.random()*1025)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`)
        .then(response => response.json())
        .then(pokedata =>{
            image.src =  pokedata["sprites"]["front_default"];
            setTimeout(function(){
                name.innerText = capitalizeFirstLetter(pokedata['name']);
                appendTypes(pokedata['types'])
                height.innerText = `${String(getRealHeight(pokedata['height']))} m`;
                weight.innerText = `${String(getRealWeight(pokedata['weight']))} kg`;
                appendAbilities(pokedata['abilities']);
                appendWeaknessOrEffectiveness(capitalizeFirstLetter(pokedata['types'][0]['type']['name']), weaknessMatrix, weakness);
                appendWeaknessOrEffectiveness(capitalizeFirstLetter(pokedata['types'][0]['type']['name']), effectivenessMatrix, effectiveness);
            },500)
        })
}

function showStats() { 
    document.getElementById("stats").style.display = "grid";
}

function loader() {
    getRandomPokemon()
    setTimeout(showStats,1500);
}

generatorButton.addEventListener("click", loader);
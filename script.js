const gameContainer = document.getElementById("game");
let clicks = 0;
let lastCard = '';
let cooldown = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "lightblue",
  "pink",
  "brown",
  "black",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "lightblue",
  "pink",
  "brown",
  "black"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if((!event.target.classList.contains('clicked'))&&cooldown===0){
    cooldown=1;
    console.log(event.target.classList[0]);
    let currentCard = event.target;
    currentCard.classList.add('clicked');
    currentCard.style.backgroundColor = currentCard.classList[0];
    clicks++;
    if(clicks===2){
      if(currentCard.classList[0]===lastCard.classList[0]){
        currentCard.style.backgroundColor = currentCard.classList[0];
        lastCard.style.backgroundColor = lastCard.classList[0];
        cooldown=0;
      }
      else{
        setTimeout(function(){
          currentCard.style.backgroundColor = 'white';
          currentCard.classList.toggle('clicked');
          lastCard.style.backgroundColor = 'white';
          lastCard.classList.toggle('clicked');
          lastCard = currentCard;
          cooldown = 0;
        },1000)
      }
      clicks = 0;
    }
    else{
      lastCard = currentCard;
      cooldown=0;
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

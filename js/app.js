// -------------- variable ----------------
let time = 0;
let timerId = 0;
let timerOut = true;
let openCards_arr = [];
let matchCard_num = 0;
let movesNum = 0;

// -------------- Elements ----------------

const the_timer = document.getElementById("timer");
const restart = document.getElementById("restart");
const container = document.querySelector("#deck");
const hearts = document.querySelectorAll("#heart li");
const allCards = [...document.querySelectorAll(".card")];
const moves = document.getElementById("moves");


//functions

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// -------------- Timer ----------------

const initClock = () => {
  timerOut = false;
  timerId = setInterval(() => {
    time++;
    timerCount();
  }, 1000);
};

const timerCount = () => {
  const minute = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    the_timer.innerHTML = `${minute}:0${sec}`;
  } else {
    the_timer.innerHTML = `${minute}:${sec}`;
  }
};

const stopClock = () => {
  clearInterval(timerId);
}; 

// -------------- shuffling / reset everyThing ----------------
const shuffling = () =>{
  movesNum = 0;
  moves.innerHTML = `${movesNum} Moves`;
  for(let i =0;i<hearts.length;i++){
  hearts[i].style.display="block";}
  for(const element of allCards)
  {
    element.classList.remove("match");
    element.classList.remove("open");
}
shuffle(allCards);

}



// -------------- Moves count ----------------

const movesCount = (number) => {
moves.innerHTML = `${number} Moves`;
 

//----delete all hearts in one time ------
// for (const element of hearts)
// {
// if (number == 2 || number == 4 || number == 6){
//   element.remove();
// }


switch (number){
  case 3:
hearts[0].style.display="none";
 break;
case 6:
  hearts[1].style.display="none";
  break;
case 9:
  hearts[2].style.display="none";
  alert("Game Over");
  moves.innerHTML = `${""}`;
  break;
  
}
if ( number == 9){
  stopClock();
  time = 0;
  timerOut = true;
  timerCount();
 shuffling();
}

};

// -------------- comparing between two cards ----------------

const matching = () => {
  if (openCards_arr[0].children[0].className == openCards_arr[1].children[0].className) {
    openCards_arr[0].classList.add("match");
    openCards_arr[1].classList.add("match");
    openCards_arr = [];
    matchCard_num++;
  } else {
   
     setTimeout(() => {
      openCards_arr[0].classList.remove("open");
      openCards_arr[1].classList.remove("open");
      openCards_arr = [];
    }, 1000);
    movesNum++;
  }
  setTimeout(() => {
    if (matchCard_num == 8){
      alert("You WIN ");
    }
  }, 1000);
};
// -------------- validClick ----------------

function validClick(card) {

  return card.classList.contains("card")&&!card.classList.contains("match")&&!card.classList.contains("open")&&openCards_arr.length<2; 
}

// -------------- event listeners ----------------

restart.addEventListener("click", function (event) {
  stopClock();
  time = 0;
  timerOut = true;
  timerCount();
 shuffling();
});

container.addEventListener("click", function (event) {
  let card = event.target;
  if(validClick(card)){
  if (timerOut) {
    initClock();
  }
  card.classList.add("open");
    openCards_arr.push(card);
  if (openCards_arr.length == 2) {
    matching();
  }
  
  movesCount(movesNum);
}

});

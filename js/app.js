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
const box = document.getElementById("mybox");
const tryAgainBtn = document.querySelector(".btn");
const closeBtn = document.querySelector(".close");
const result = document.querySelector("#result");

//------------- All functions -------------

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

// -------------- reset everyThing ----------------

const resetAll = () => {
  stopClock();
  time = 0;
  timerOut = true;
  timerCount();
  movesNum = 0;
  moves.innerHTML = `${movesNum} Moves`;
  for(let i =0;i<hearts.length;i++){
  hearts[i].style.display="block";}
  for(const element of allCards)
  {
    element.classList.remove("match");
    element.classList.remove("open");
}
  
}

// -------------- shuffling  ----------------


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

const shuffling = () =>{
 
const shuffledCards = shuffle(allCards);
  for (let card of shuffledCards){
    container.appendChild(card);
  }
}


 // -------------- validClick ----------------

function validClick(card) {

  return card.classList.contains("card")&&!card.classList.contains("match")&&!card.classList.contains("open")&&openCards_arr.length<2; 
}



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
  }
  movesNum++;
  winMessage(matchCard_num);
};
const winMessage = (num) => {setTimeout(() => {
  if (num == 8){
    box.style.display="block";
result.innerHTML = "<img src='img/winImg.png' alt='win' width='50%'>";
stopClock();
  }
}, 1000);
}



// -------------- Moves count ----------------

const movesCount = (number) => {
moves.innerHTML = `${number} Moves`;
switch (number){
  case 16:
hearts[0].style.display="none";
 break;
case 24:
  hearts[1].style.display="none";
  break;
case 32:
  hearts[2].style.display="none";
  break;
  
}
setTimeout(() => {
  if (number == 32){
    box.style.display="block";
    result.innerHTML = "<img src='img/lossImg.png' alt='lose' width='70%'>";
    stopClock();
  }
}, 1000);


};

// -------------- start here ----------------

shuffling();
box.style.display="none";

// -------------- event listeners ----------------

restart.addEventListener("click", function (event) {
resetAll();
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


tryAgainBtn.addEventListener("click" , function (event) {
box.style.display = "none";
  resetAll();
  shuffling();

});

closeBtn.addEventListener("click",function (event) {
  box.style.display = "none";

});
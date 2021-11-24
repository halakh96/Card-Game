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

// -------------- variable ----------------
let time = 0;
let timerId = 0;
let timerOut = true;
const openCards_arr = [];
let movesNum = 0;

// -------------- Elements ----------------

const the_timer = document.getElementById("timer");
const restart = document.getElementById("restart");
const container = document.getElementById("deck");
const hearts = document.querySelector("#heart li");


//functions
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

 

// -------------- Moves counting ----------------

const movesCount = (number) => {
switch(number){
case 16 :
  hearts.remove();
break;
case 24 :
  hearts.remove();
break;
case 32 :
  hearts.remove();
break;
}
   
}

// -------------- comparing between two cards ----------------
matching = (arr) => {
  
    if (arr[0].children[0].className == arr[1].children[0].className) {
     arr[0].classList.add("match");
     arr[1].classList.add("match");  

   } else {
    arr[0].classList.remove("open");
    arr[1].classList.remove("open"); 
     
    }
  
    arr =[];
    movesNum++;
};
// -------------- validClick ----------------

const validClick = (card) => {
  if (
    card.classList.contains("card") &&
    !card.classList.contains("open") &&
    !card.classList.contains("match")
  ) {
    card.classList.add("open");
    openCards_arr.push(card);
  
  if(openCards_arr.length == 2){
    matching(openCards_arr);}
  }
  
};

// -------------- event listeners ----------------

restart.addEventListener("click", function () {
  stopClock();
  time = 0;
  timerOut = true;
  timerCount();
});

container.addEventListener("click", function (event) {
  validClick(event.target);
  if (timerOut) {
    initClock();
  }
});

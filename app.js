// Game var
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3; 

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message'); 

// Assign UI min and max
minNum.textContent = min; 
maxNum.textContent = max; 

// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className == 'play-again'){
    window.location.reload(); 
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

// Validate
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number betweeen ${min} and ${max}`, 'red')
} else if(guess === winningNum){
  // Game-over WON
  gameOver(`${winningNum} is correct, You Win!`,true); 

} else {
    // Wrong guess
    guessesLeft -= 1; 
    if(guessesLeft == 0){
      // Game-over LOST
      gameOver(`Game Over, You Lost! The correct number was ${winningNum}`,false); 

    } else {
      // Game continues - answer wrong 

      // Change border color
      guessInput.style.borderColor = 'red'; 

      // Clear the input
      guessInput.value = ''; 

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left.`,'brown')
    }
}
  
})

// Game Over
function gameOver(msg,won){
  let color;
  won === true ? color = 'green' : color = 'red'; 
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg,color); 
  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Set random num
function getRandomNum(min,max){
   return Math.floor(Math.random()*(max-min+1)+min); 
}

// Set message
function setMessage(msg, color){
  message.style.color = color; 
  message.textContent = msg; 
}
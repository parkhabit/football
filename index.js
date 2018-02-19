var c;
var ctx;
var ballX = 150;
var ballY = -5;
var ballSpeedY = 3;
var paddle = 130;
var computerScore = 0;
var message = "";
var playAgain = "";

window.onload = function() {
  c = document.getElementById("gameCanvas");
  ctx = c.getContext("2d");
  //image
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, 300, 250);
  };
  img.src = "./assets/Phantom-Football_Title-v1.jpg";
  var framesPerSecond = 30;

  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 32) {
      setInterval(function() {
        moveEverything();
        drawEverything();
      }, 1000 / framesPerSecond);
    }
  });
};

//movement of ball
function moveEverything() {
  //moves ball along slowly at 30 frames a second
  ballY = ballY + ballSpeedY;

  //if it touches the paddle you save it
  if (ballY >= 160 && ballX - 20 <= paddle + 40 && ballX >= paddle - 20) {
    console.log("Good save");
    ballReset();
    //if it doesn't touch the paddle & is between the goal posts you miss
  } else if (ballY > 240 && ballX > 25 && ballX < 260) {
    console.log("Boo! You missed");
    ballReset();
    if (computerScore > 2) {
      message = "You loose!";
      playAgain = "Press spacebar to play again";
      ctx.fillStyle = "red";
      window.addEventListener("keydown", function(e) {
        if (e.keyCode === 32) {
          computerScore = 0;
          message = "";
          playAgain = "";
          paddle = 130;
        }
      });
    } else {
      computerScore += 1;
    }

    //if the ball is out of range
  } else if (ballY > 250 || ballX >= 290 || ballX < 0) {
    console.log("Out of range");
    ballReset();
  }
}

//drawing elements on the canvas
function drawEverything() {
  //field
  ctx.fillStyle = "#a5bd7b";
  ctx.fillRect(0, 0, c.width, c.height);
  //ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  //keeper
  ctx.fillStyle = "#666";
  ctx.fillRect(paddle, 180, 40, 20);
  //goal
  ctx.strokeStyle = "#000";
  ctx.strokeRect(50, 210, 200, 40);
  //scoring
  ctx.fillText(`Score : ${computerScore}`, 10, 10);
  //message
  ctx.fillText(`${message}`, 125, 100);
  ctx.fillText(`${playAgain}`, 85, 120);
}

//motion of paddle-goalkeeper
window.addEventListener("keydown", function(e) {
  //the paddle can't go out of the field
  if (paddle <= 0) {
    paddle = 5;
  } else if (paddle > 205) {
    paddle = 205;
  }
  //paddle moves right and left with keycode
  if (e.keyCode === 39) {
    paddle = paddle + 5;
  } else if (e.keyCode === 37) {
    paddle = paddle - 5;
  }
});

//reset the ball to the beginning position
function ballReset() {
  ballX = Math.floor(Math.random() * 280);
  ballY = -5;
}

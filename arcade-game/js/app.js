
let gameStart = false;
// @initianilize colisions
let colisions = 0;
hearts();
//get elements
const modal = document.getElementById('myModal');
const m_content = document.querySelector('.modal-content');
const btn = document.getElementById("myBtn");
restartGame();
if(gameStart === true){      
                modal.style.display = "none";
                
            }
        else {
                
                modal.style.display = "block";                
              
          }
// Enemies our player must avoid
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speedX = 2;
    this.sprite = 'images/enemy-bug.png';
    this.update();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speedX * Math.random();
    if (this.x > 505) {
        this.x = -100;
        this.speedX = Math.floor(Math.random() * 2 + 1);
    }


//Check if collision between player and enemy happen
    if ((player.y < 400) && (player.y > 50)) {
        if (((player.x - this.x) < 40) && ((player.y - this.y) < 40)) {
           
           
            hearts();
            ++colisions;
        }
    }

};
 
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 300;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.update();
    this.handleInput();
};



Player.prototype.update = function () {};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function () {
    this.x = 300;
    this.y = 400;
};

Player.prototype.handleInput = function (key) {

    if (key == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 100;
    }
    if (key == 'right' && this.x < 350) {
        this.x += 100;
    }
    if (key == 'down' && this.y < 400) {
        this.y -= -100;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let enemy1 = new Enemy(-100, 70);
let enemy2 = new Enemy(-200, 225);
let enemy3 = new Enemy(-50, 140);
let enemy4 = new Enemy(-600, 220);
let allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function restartGame() {  
      
    btn.onclick = () => {
        gameStart = true;
        modal.style.display = "none";
        m_content.style.display="none";        
    }  
};

//select player
const choosePlayer = (selection) => {
    switch(selection){
        case "boy": 
            player.sprite = 'images/char-boy.png';
            break; 
            case "cat":
            player.sprite = 'images/char-cat-girl.png';
            break;
            case "horn":
            player.sprite = 'images/char-horn-girl.png';
            break;
            case "pink":
            player.sprite = 'images/char-pink-girl.png';
            break;
            case "princess":
            player.sprite = 'images/char-princess-girl.png';
            break;
    }
}

// @manage hearts in game
function hearts() {
    document.querySelector(".colisions").textContent = `${colisions}`; 
   console.log (colisions); //@index modal with number of colisions
    if (colisions === 0) { //@for colisions less than 25 disply 3 stars
        document.querySelector(".heart1").classList.add("fas", "fa-heart");
        document.querySelector(".heart2").classList.add("fas", "fa-heart");
        document.querySelector(".heart3").classList.add("fas", "fa-heart");
    } else if (colisions === 1) {
         // after 25 colisions decrement a star
        document.querySelector(".heart3").classList.remove("fas", "fa-heart");
        document.querySelector(".heart3").classList.add("far", "fa-heart");
   
    } else if (colisions === 2) { //@for colisions les than 35 disply 1 star
        document.querySelector(".heart2").classList.remove("fas", "fa-heart");
        document.querySelector(".heart2").classList.add("far", "fa-heart");
       
    } else if (colisions === 3) { //@for colisions les than 35 disply 1 star
        document.querySelector(".heart1").classList.remove("fas", "fa-heart");
        document.querySelector(".heart1").classList.add("far", "fa-heart");
    }
};


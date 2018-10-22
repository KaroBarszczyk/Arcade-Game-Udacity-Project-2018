// Sets the initial score on 0 
const scoreEl = document.getElementById("liveScore");
let score = 0;
scoreEl.innerHTML = score;

//Sets number of life on 5
const lifeEl = document.getElementById("life");
let life = 5;
lifeEl.innerHTML = life;





/*--------------------------------------------------
----------------------------------------------------
                    ENEMY
----------------------------------------------------
--------------------------------------------------*/

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    //"https://res.cloudinary.com/karamba/image/upload/v1527689024/arcadeGame/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Resets enemy's position when they reaches end of game board
    if (this.x > 600) {
        this.x = -50;
        this.speed = 250 + Math.floor(Math.random() * 300);
    }

    // Checks collisions between enemy and player 
    if (((player.x > this.x && player.x < this.x + 55) ||
        (player.x + 35 > this.x && player.x + 35 < this.x + 55)) &&
        ((player.y > this.y && player.y < this.y + 35) ||
        (player.y + 30 > this.y && player.y + 30 < this.y + 35))) {
        //Resets position and score to 0
        player.x = 200; 
        player.y = 400;
        score = 0; 
        //Eeach collision reduces the amount of life by 1
        life --;
        document.getElementById("liveScore").innerHTML = score;
        document.getElementById("life").innerHTML = life;

        if (life <= 0){
            alert(" Unfortunately you have no more lives. Play again!");
            //New sets number of life on 5
            life = 5;
            document.getElementById("life").innerHTML = life;

        } 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*--------------------------------------------------
----------------------------------------------------
                    PLAYER
----------------------------------------------------
--------------------------------------------------*/
//Create Player object 
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-pink-girl.png";
};


//Update player's position
Player.prototype.update = function() {
    // Stops the player from moving off canvas 
    //when player's position reaches end of game board
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 410) {
        this.x = 410;
    }

    if (this.y > 400) {
        this.y = 400;
    }

    // Adds 1 point the player when they reached end of the game board
    if (this.y < 0) {
        this.x = 200;
        this.y = 400;
        score ++;
        document.getElementById('liveScore').innerHTML = score;
        //Alert with the end of the game and congratulations after achieves 10 points
        if(score >= 10) {
            alert("Congratulation! You won! You earned 10 points!");
            document.getElementById("liveScore").innerHTML = "0";
            //New sets number of life on 5
            life = 5;
            document.getElementById("life").innerHTML = life;
        }
    }


};


// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [];
let enemyPosition = [60, 140, 225];

// Place the player object in a variable called player
let player = new Player(200, 400, 50);

//Set Enemies positions and speeds
enemyPosition.forEach(function(positionY) {
    let enemy = new Enemy(0, positionY, 200 + Math.floor(Math.random() * 600));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Update Player's position 
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 35;
            break;
        case 'down':
            this.y += this.speed + 35;
            break;   
    }
};

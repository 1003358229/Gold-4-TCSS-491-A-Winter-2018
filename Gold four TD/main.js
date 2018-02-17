//Edited by 
//Dongsheng Han
//Karan Kurbur
//Dirk Sexton

//TCSS491 2018

//Gameboard



var board = [];
board = [];
for (var i = 0; i < 18; i++) {
    board.push([]);
    for (var j = 0; j < 18; j++) {
        board[i].push(0);
    }
}
// board[0][5] = 10;
// board[1][5] = 10;
// board[2][5] = 10;
// board[3][5] = 10;
// board[4][5] = 10;
// board[4][6] = 10;
// //board[6][2] = 10;

// board[7][2] = 10;
// board[7][1] = 10;

board[0][5] = 10;
board[1][5] = 10;
board[2][5] = 10;
board[3][5] = 10;
board[4][5] = 10;
board[4][4] = 10;

board[5][8] = 10;



function GameBoard(game) {

    Entity.call(this, game, 20, 20);
	this.radius_x = 0;
	this.radius_y = 0;
	this.display_radius = false;
	this.score = 0;
	this.money = 1000;
    //this.grid = false;
    this.canBuy = true;
	this.purchaes_and_placed = false;
    this.player = 0;
    // this.board = [];
    // for (var i = 0; i < 18; i++) {
    //     this.board.push([]);
    //     for (var j = 0; j < 18; j++) {
    //         this.board[i].push(0);
    //     }
    // }
    // this.board[0][5] = 10;
    // this.board[1][5] = 10;
    // this.board[2][5] = 10;
    // this.board[3][6] = 10;
    // this.board[3][7] = 10;

}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    //if clicked inside the map
    if (this.game.click 
		&& this.game.click.x > -1 && this.game.click.x < 18 
		&& this.game.click.y > -1 && this.game.click.y < 18 ) {
		
		//place tower on an empty space (player = 0)
		if(board[this.game.click.x][this.game.click.y] === 0){
			//changed from false to true to avoid bug
			var canAfford = true;
			//I want to not display the shadow after a success purchase of tower
			purchaes_and_placed = false;

			//Using this.canBuy to determine if to draw shadow and if you can place another tower
			//TODO: modify this.canBuy outside of click loop to fix small bug where you
			//have less than price of current tower but haven't clicked since then 
			//Money subtraction
			//put all four statement in to one
			if (this.player === 1 && this.money >= 50) {
				this.money -= 50;
			} else if (this.player === 2 && this.money >= 100) {
				this.money -= 100;
			} else if (this.player === 3 && this.money >= 75) {
				this.money -= 75;
			} else if (this.player === 4 && this.money >= 125) {
				this.money -= 125;
			} else if (this.player === 5 && this.money >= 150) {
				this.money -= 250;
			} else if (this.player === 6 && this.money >= 275) {
				this.money -= 275;
			} else if (this.player === 7 && this.money >= 150) {
				this.money -= 150;
			} else if (this.player === 8 && this.money >= 350) {
				this.money -= 350;
			}else{
				canAfford = false;
			}

            //place down the tower
			if(canAfford) {
                board[this.game.click.x][this.game.click.y] = this.player;
                purchaes_and_placed = true;
                this.player = 0;
                var newTower = new tower1(gameEngine,this.game.click.x,this.game.click.y);
                gameEngine.addEntity(newTower);
			} else {
				this.canBuy = false;
			}
			
			//not draw radius for tower not already been placed
			this.radius_x = this.game.click.x;
			this.radius_y = this.game.click.y;
			this.display_radius = false;
		}
		//draw radius for tower already been placed
		if(board[this.game.click.x][this.game.click.y] != 0){
			this.radius_x = this.game.click.x;
			this.radius_y = this.game.click.y;
			this.display_radius = true;
		}

    }

	//Select tower
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 1 && this.money >= 50) {
        this.player = 1;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 3 && this.money >= 100) {
        this.player = 2;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 5 && this.money  >= 75) {
        this.player = 3;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 7 && this.money >= 125) {
        this.player = 4;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 9 && this.money >= 150) {
        this.player = 5;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 11 && this.money  >= 275) {
        this.player = 6;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 13 && this.money >= 150) {
        this.player = 7;
	    this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 15 && this.money >= 350) {
        this.player = 8;
		this.canBuy = true;
    }
	
    Entity.prototype.update.call(this);
}

GameBoard.prototype.draw = function (ctx) {
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/960px-Blank_Go_board.png"), this.x, this.y, 800, 800);
	
    var size = 41.67;
    var offset = 45;
	
	//Score and money
	ctx.font = "25px Arial";
	ctx.strokeText("Score: " + this.score, 45, 40); 
	ctx.strokeText("Money: " + this.money, 420, 40); 
	ctx.strokeStyle = "white";
	ctx.strokeText("Towers", 865, 40); 
	ctx.strokeText("$50", 930, 120); 
	ctx.strokeText("$100", 930, 200); 
	ctx.strokeText("$75", 930, 280); 
	ctx.strokeText("$125", 930, 360); 
	ctx.strokeText("$150", 930, 440); 
	ctx.strokeText("$275", 930, 520); 
	ctx.strokeText("$150", 930, 600); 
	ctx.strokeText("$350", 930, 680); 
 
	//Draw tower menu
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower1.png"), 20 * size + offset, size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower2.png"), 20 * size + offset, 3 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), 20 * size + offset, 5 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower4.png"), 20 * size + offset, 7 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower5.png"), 20 * size + offset, 9 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower6.png"), 20 * size + offset, 11 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower7.png"), 20 * size + offset, 13 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower8.png"), 20 * size + offset, 15 * size + offset - 20, 40, 60);
	
    // draw mouse shadow with tower and its radius
    if (this.game.mouse && this.canBuy && !this.purchaes_and_placed) {
		ctx.save();
        ctx.globalAlpha = 0.25;
        if(this.player === 1) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower1.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if(this.player === 2) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower2.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
		if(this.player === 3) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), this.game.mouse.x * size + offset + 3, this.game.mouse.y * size + offset - 20, 40, 60);
		if(this.player === 4) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower4.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if(this.player === 5) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower5.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
		if(this.player === 6) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower6.png"), this.game.mouse.x * size + offset + 3, this.game.mouse.y * size + offset - 20, 40, 60);
		if(this.player === 7) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower7.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if(this.player === 8) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower8.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);

        //draw radius for tower
        if (this.player != 0) {
            ctx.beginPath();
            ctx.rect(offset + (this.game.mouse.x - 2) * size, offset + (this.game.mouse.y - 2) * size, size * 5, size * 5);
            ctx.lineWidth = "10";
            ctx.strokeStyle = "blue";
            ctx.stroke();
        }
        ctx.restore();
	}

	//draw radius for tower when clicked
	if(board[this.radius_x][this.radius_y] != 0){
		ctx.beginPath();
		ctx.rect(offset + (this.radius_x-2)*size, offset + (this.radius_y-2)*size, size * 5, size * 5);
		ctx.lineWidth="5";
        ctx.strokeStyle ="blue";
		ctx.stroke();
    }

    Entity.prototype.draw.call(this);
}



//animation for attacker
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, scale) {//sheetWidth, 
    this.spriteSheet = spriteSheet;
	this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.loop = loop;
    this.scale = scale;
	
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
	
    var xindex = this.currentFrame();
    var yindex = 0;
	
    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth + this.startX, yindex * this.frameHeight + this.startY,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}



//tower function start here
function tower1(game,x,y) {
    this.boardX = x;
    this.boardY = y;
    this.game = game;
    this.ctx = game.ctx;
    this.towerRange = 2; //Can attack 5x5 square with tower in center.
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/cannonball.png"), 0, 0, 420, 420, 0.2, 1, true, 0.1);
    this.x;
    this.y;
    this.size = 41.67;
    this.offset = 45;
    this.attacker = 0;
    this.fire = false;
    this.fire_distance = 0;
    this.fire_frames = 20;
}

tower1.prototype = new Entity();
tower1.prototype.constructor = tower1;

tower1.prototype.draw = function (ctx) {
    var player = board[this.boardX][this.boardY];
    var joined = ['./img/tower', player, '.png'].join('');
    ctx.drawImage(ASSET_MANAGER.getAsset(joined), this.boardX * this.size + this.offset, this.boardY * this.size + this.offset - 20, 40, 60);
    if (this.fire){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
};

tower1.prototype.update = function (ctx) {
    var isInrange;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && ent.attacker == 1) { //Entity is an enemy, should check to see if it is in range.
            isInrange = this.inRange(ent.boardX, ent.boardY);
            if (isInrange) {
                this.fire = true;
                break;
            } else {
                this.fire = false;
            }
        };
    };
    if (this.fire) {
        (ent.x + 6) < (this.boardX * this.size + this.offset)
            ? this.x = (this.boardX * this.size + this.offset)
            - this.fire_distance * Math.abs((ent.x + 6) - (this.boardX * this.size + this.offset)) / this.fire_frames
            : this.x = (this.boardX * this.size + this.offset)
            + this.fire_distance * Math.abs((ent.x + 6) - (this.boardX * this.size + this.offset)) / this.fire_frames;

        (ent.y + 10) < (this.boardY * this.size + this.offset)
            ? this.y = (this.boardY * this.size + this.offset)
            - this.fire_distance * Math.abs((ent.y + 10) - (this.boardY * this.size + this.offset)) / this.fire_frames
            : this.y = (this.boardY * this.size + this.offset)
            + this.fire_distance * Math.abs((ent.y + 10) - (this.boardY * this.size + this.offset)) / this.fire_frames;
    }
    if (this.fire_distance < this.fire_frames) {
        this.fire_distance++;
    } else {
        this.fire_distance = 0;
        //pause for a loop
    }

    Entity.prototype.update.call(this);
};

tower1.prototype.inRange = function (x, y) {
    return x <= this.boardX + this.towerRange && x >= this.boardX - this.towerRange && x <= this.boardY + this.towerRange && y >= this.boardY - this.towerRange;
}



//add attacker
function attackDude(game, xTile, yTile) {
    this.scale = 0.8;
    this.animationR = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 128, 64, 64, 0.2, 4, true, this.scale);
    this.animationL = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 64, 64, 64, 0.2, 4, true, this.scale);
    this.animationU = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 192, 64, 64, 0.2, 4, true, this.scale);
    this.animationD = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 0, 64, 64, 0.2, 4, true, this.scale);
    this.direction = 1;//1R 2L 3U 4D
    this.x_offset = 39;
    this.y_offset = 35;
    this.size = 41.67;
    this.x = this.x_offset + xTile *this.size;
    this.y = this.y_offset + yTile *this.size;;
    this.offset = 45;
    this.attacker = 1;
    this.game = game;
    this.ctx = game.ctx;
    this.boardX = 0;
    this.boardY = 0;
}

attackDude.prototype = new Entity();
attackDude.prototype.constructor = attackDude;

attackDude.prototype.draw = function (ctx) {
	if(this.direction === 1){
	    this.animationR.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
	if(this.direction === 2){
	    this.animationL.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
	if(this.direction === 3){
	    this.animationU.drawFrame(this.game.clockTick, ctx, this.x, this.y);
	}
	if(this.direction === 4){
	    this.animationD.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }

    //red circle around dog
    ctx.beginPath();
    ctx.lineWidth="6";
    ctx.strokeStyle="red";
    ctx.rect(this.x + 6, this.y + 10, 1, 1);
    ctx.stroke();
    ctx.lineWidth="1";
    ctx.strokeStyle="red";
    ctx.rect(this.x + 6, this.y + 10, this.size, this.size);
    ctx.stroke();

	Entity.prototype.draw.call(this);
}


attackDude.prototype.update = function () {

    // walk in the square for now
    // walk to 4,0

    // if (this.x < Math.ceil(this.x_offset + this.size * 4)
    //     && this.y === this.y_offset) {
    //     this.direction = 1;
    //     this.x += 0.25 * 4;
    // //walk to 4,4
    // } else if (this.x === Math.ceil(this.x_offset + this.size * 4)
    //     && this.y < Math.ceil(this.y_offset + this.size * 4)) {
    //     this.direction = 4;
    //     this.y +=0.25 * 4;
    // //walk to 0,4
    // } else if (this.x > this.x_offset
    //     && this.y === Math.ceil(this.y_offset + this.size * 4)) {
    //     this.direction = 2;
    //     this.x -= 0.25 * 4;
    // //walk to 0,0
    // } else if (this.x === this.x_offset && this.y > this.y_offset) {
    //     this.direction = 3;
    //     this.y -= 0.25 * 4;
    // }

    if(this.direction == 1) {
        this.x += 0.25 * 4;
    } else if(this.direction == 4) {
        this.y += 0.25 * 4;
    }else if(this.direction == 2) {
        this.x -= 0.25 * 4;
    }else if(this.direction == 3) {
        this.y -= 0.25 * 4;
    }
    
    var newTile = false;

    var changedX =  Math.ceil((this.x - this.offset) / this.size);
    if(changedX != this.boardX) {
        this.boardX = changedX;
        newTile = true;
    }
    var changedY =  Math.ceil((this.y - this.offset) / this.size);
    if(changedY != this.boardY) {
        this.boardY = changedY;        
        newTile = true;
    }
    
    if(newTile) {
        this.direction = getNewDirection(this.boardX,this.boardY,this.direction);
    }
	Entity.prototype.update.call(this);
}

function getNewDirection(xCoord, yCoord, oldDirection) {

    if(xCoord + 1 <=  17) {

    //console.log(xCoord,yCoord);
    if(board[xCoord + 1][yCoord] == 10) { //Right
        return 1;
    }else if(board[xCoord][yCoord-1] == 10) { //Up
        return 4;
    } else if(board[xCoord][yCoord+1] == 10) { //Down
        return 3;
    }}
    return oldDirection;
}





// the "main" code begins here
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/tower1.png");
ASSET_MANAGER.queueDownload("./img/tower2.png");
ASSET_MANAGER.queueDownload("./img/tower3.png");
ASSET_MANAGER.queueDownload("./img/tower4.png");
ASSET_MANAGER.queueDownload("./img/tower5.png");
ASSET_MANAGER.queueDownload("./img/tower6.png");
ASSET_MANAGER.queueDownload("./img/tower7.png");
ASSET_MANAGER.queueDownload("./img/tower8.png");
ASSET_MANAGER.queueDownload("./img/Attack.png");
ASSET_MANAGER.queueDownload("./img/cannonball.png");


var gameEngine = new GameEngine();
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameboard = new GameBoard(gameEngine);
    console.log("GAME ENGINE " + gameEngine);
    console.log(gameboard);
    gameEngine.addEntity(gameboard);
    gameEngine.init(ctx);

    console.log("GAME entities count = " + gameEngine.entities.length);

    //add attacker
    var attacker = new attackDude(gameEngine,0,5);
    //var attacker2 = new attackDude(gameEngine,0,11);
    
    
    gameEngine.addEntity(attacker);
    //gameEngine.addEntity(attacker2);
    var timesRun = 1;

    gameEngine.start();

    //repeatly add attacker
    // var interval = setInterval(function () {
    //     var attacker = new attackDude(gameEngine);
    //     gameEngine.addEntity(attacker);
    //     timesRun += 1;
    //     if (timesRun === 5) {//count of enemy
    //         clearInterval(interval);
    //     }
    // }, 1000); 

});
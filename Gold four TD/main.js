//Edited by 
//Dongsheng Han
//Karan Kurbur
//Dirk Sexton

//TCSS491 2018

//Gameboard
function GameBoard(game) {
    Entity.call(this, game, 20, 20);
	this.score = 0;
	this.money = 100000;
    this.grid = false;
    this.canBuy = true;
	this.purchaes_and_placed = false;
    this.player = 0;
    this.board = [];
    for (var i = 0; i < 22; i++) {
        this.board.push([]);
        for (var j = 0; j < 18; j++) {
            this.board[i].push(0);
        }
    }
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;


//Will use this later to determine if the place on the map is a path for enemies or not
//Not this logic is in correct place. Should be a field of gameBoard
GameBoard.prototype.getPlaceTower = function() {
    var canPlace = false;
    if(this.board[this.game.click.x][this.game.click.y] === 0) {
        canPlace = true;
    }
    return canPlace;
}

GameBoard.prototype.update = function () {
    if (this.game.click 
		&& this.game.click.x > -1 && this.game.click.x < 18 
		&& this.game.click.y > -1 && this.game.click.y < 18 
		&& this.board[this.game.click.x][this.game.click.y] === 0) {

        //changed from false to true to avoid bug
		var canAfford = true;
        //I want to not display the shadow after a success purchase of tower
		purchaes_and_placed = false;

        //Using this.canBuy to determine if to draw shadow and if you can place another tower
        //TODO: modify this.canBuy outside of click loop to fix small bug where you
        //have less than price of current tower but haven't clicked since then 
        //Money subtraction
		//put all four statement in to one
		if (this.player === 1 && this.money >= 100) {
            this.money -= 100;
		} else if (this.player === 2 && this.money >= 50) {
            this.money -= 50;
		} else if (this.player === 3 && this.money >= 75) {
            this.money -= 75;
        }else{
			canAfford = false;
        }

        // //TODO: fix to be accurate to specific tower: EX: start with 100 use 75 tower, have 25 left but cant place
        // if(this.money == 0) {
            // this.canBuy = false;
        // }
        
        if(canAfford) {
            this.board[this.game.click.x][this.game.click.y] = this.player;
			purchaes_and_placed = true;
			this.player = 0;
        } else {
            this.canBuy = false;
        }
    }


	//Select tower
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 1 && this.money >= 100) {
        this.player = 1;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 2 && this.money >= 50) {
        this.player = 2;
		this.canBuy = true;
    }
	if (this.game.click && this.game.click.x === 20 && this.game.click.y === 3 && this.money  >= 75) {
        this.player = 3;
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
	ctx.strokeText("100", 930, 110); 
	ctx.strokeText("50", 930, 150); 
	ctx.strokeText("75", 930, 190); 
	
	//Draw tower menu
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/black.png"), 20 * size + offset, size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/white.png"), 20 * size + offset, 2 * size + offset - 20, 40, 60);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), 20 * size + offset, 3 * size + offset - 20, 40, 60);


    for (var i = 0; i < 22; i++) {
        for (var j = 0; j < 18; j++) {
			// shows the grid of each image placement
            //ctx.strokeStyle = "Green";
            //ctx.strokeRect(i * size + offset, j * size + offset, size, size);

            if (this.board[i][j] === 1) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/black.png"), i * size + offset, j * size + offset - 20, 40, 60);
            }
            if (this.board[i][j] === 2) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/white.png"), i * size + offset, j * size + offset -20, 40, 60);
            }
			if (this.board[i][j] === 3) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), i * size + offset, j * size + offset - 20, 40, 60);
            }
        }
    }

    // draw mouse shadow
    if (this.game.mouse && this.canBuy && !this.purchaes_and_placed) {
		// //testing console log
		// var x = this.purchaes_and_placed.toString();
		// var y = this.canBuy.toString();
		// var z = this.game.mouse.toString();
		// console.log(x, y, z);
		ctx.save();
        ctx.globalAlpha = 0.25;
        if(this.player === 1) ctx.drawImage(ASSET_MANAGER.getAsset("./img/black.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if(this.player === 2)  ctx.drawImage(ASSET_MANAGER.getAsset("./img/white.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
		if(this.player === 3)  ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        ctx.restore();
	}
    // }else{
		// // testing console log
		// var a = this.purchaes_and_placed.toString();
		// var b = this.canBuy.toString();
		// // var c = this.game.mouse.toString();
		// console.log(a, b);
	// }
	
	
}



// the "main" code begins here
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");
ASSET_MANAGER.queueDownload("./img/tower3.png");
ASSET_MANAGER.queueDownload("./img/Attack.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var gameboard = new GameBoard(gameEngine);
    console.log("GAME ENGINE " + gameEngine);


    //console.log(gameboard);
    gameEngine.addEntity(gameboard);
    gameEngine.init(ctx);
	
	//add attacker
    var attacker = new attackDude(gameEngine, ASSET_MANAGER.getAsset("./img/Attack.png"));
    gameEngine.addEntity(attacker);
    gameEngine.start();
});



//add attacker
function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
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

function attackDude(game, spritesheet) {
    Entity.call(this, game, 0, 0);
	this.animation = new Animation(spritesheet, 536, 495, 10, 0.10, 10, true, 0.2);
	this.x = 5;
    this.y = 400;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    //console.log(this.ctx);
}

attackDude.prototype = new Entity();
attackDude.prototype.constructor = attackDude;

attackDude.prototype.draw = function () {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

attackDude.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}
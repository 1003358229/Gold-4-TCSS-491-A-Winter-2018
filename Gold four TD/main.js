//Edited by 
//Dongsheng Han
//Karan Kurbur
//Dirk Sexton

//TCSS491 2018

//Gameboard

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
    this.board = [];
    for (var i = 0; i < 18; i++) {
        this.board.push([]);
        for (var j = 0; j < 18; j++) {
            this.board[i].push(0);
        }
    }
    //////////////for test
    this.board[2][2] = 1;
}

GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;


////Will use this later to determine if the place on the map is a path for enemies or not
////Not this logic is in correct place. Should be a field of gameBoard
//GameBoard.prototype.getPlaceTower = function() {
//    var canPlace = false;
//    if(this.board[this.game.click.x][this.game.click.y] === 0) {
//        canPlace = true;
//    }
//    return canPlace;
//}

GameBoard.prototype.update = function () {
    //if clicked inside the map
    if (this.game.click 
		&& this.game.click.x > -1 && this.game.click.x < 18 
		&& this.game.click.y > -1 && this.game.click.y < 18 ) {
		
		//place tower on an empty space (player = 0)
		if(this.board[this.game.click.x][this.game.click.y] === 0){
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

			// //TODO: fix to be accurate to specific tower: EX: start with 100 use 75 tower, have 25 left but cant place
			// if(this.money == 0) {
				// this.canBuy = false;
			// }

            //place down the tower
			if(canAfford) {
				this.board[this.game.click.x][this.game.click.y] = this.player;
				purchaes_and_placed = true;
				this.player = 0;
			} else {
				this.canBuy = false;
			}
			
			//draw radius for tower already been placed
			this.radius_x = this.game.click.x;
			this.radius_y = this.game.click.y;
			this.display_radius = false;
		}
		//draw radius for tower already been placed
		if(this.board[this.game.click.x][this.game.click.y] != 0){
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


    //draw all towers on map
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 18; j++) {
			// shows the grid of each image placement
            //ctx.strokeStyle = "Green";
            //ctx.strokeRect(i * size + offset, j * size + offset, size, size);
            if (this.board[i][j] === 1) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower1.png"), i * size + offset, j * size + offset - 20, 40, 60);
            }
            if (this.board[i][j] === 2) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower2.png"), i * size + offset, j * size + offset -20, 40, 60);
            }
			if (this.board[i][j] === 3) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), i * size + offset + 3, j * size + offset - 20, 40, 60);
            }
			if (this.board[i][j] === 4) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower4.png"), i * size + offset, j * size + offset - 20, 40, 60);
            }
            if (this.board[i][j] === 5) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower5.png"), i * size + offset, j * size + offset -20, 40, 60);
            }
			if (this.board[i][j] === 6) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower6.png"), i * size + offset + 3, j * size + offset - 20, 40, 60);
            }
			if (this.board[i][j] === 7) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower7.png"), i * size + offset, j * size + offset - 20, 40, 60);
            }
            if (this.board[i][j] === 8) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower8.png"), i * size + offset, j * size + offset -20, 40, 60);
            }
        }
    }
	
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
        if(this.player != 0) {
            ctx.beginPath();
            ctx.rect(offset + (this.game.mouse.x - 2) * size, offset + (this.game.mouse.y - 2) * size, size * 5, size * 5);
            ctx.lineWidth = "10";
            ctx.strokeStyle = "blue";
            ctx.stroke();
        }
        ctx.restore();
	}

	//draw radius for tower when clicked
	if(this.board[this.radius_x][this.radius_y] != 0){
		ctx.beginPath();
		ctx.rect(offset + (this.radius_x-2)*size, offset + (this.radius_y-2)*size, size * 5, size * 5);
		ctx.lineWidth="5";
        ctx.strokeStyle ="blue";
		ctx.stroke();
	}

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

//add attacker
function attackDude(game) {
	this.animationR = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 128, 64, 64, 0.2, 4, true, 1);
	this.animationL = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 64, 64, 64, 0.2, 4, true, 1);
	this.animationU = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 192, 64, 64, 0.2, 4, true, 1);
	this.animationD = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 0, 64, 64, 0.2, 4, true, 1);
    this.direction = 1;//1R 2L 3U 4D
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/cannonball.png"), 0, 0, 420, 420, 0.2, 1, true, 0.3);
    this.ball_x = 0;
    this.ball_y = 0;
    this.fire = false;
    this.tower_x = 0;
    this.tower_y = 0;
	//this.x = 35;
    //this.y = 235;//offset x = 35 y = 25 this.size = 41.67
	//this.rannum =  1;
	// this.rannum =  Math.round(Math.random());
    this.x_offset = 33;
    this.y_offset = 25;
    this.x = this.x_offset;
    this.y = this.y_offset;
    this.size = 41.67
    this.offset = 45;

    this.game = game;
    this.ctx = game.ctx;
}

attackDude.prototype = new Entity();
attackDude.prototype.constructor = attackDude;

attackDude.prototype.collide = function (other, i, j) {
    //if (!((i - 2) * this.size <= this.x - this.x_offset)) {
    //    console.log(1, (i - 2) * this.size, this.x - this.x_offset);
    //}
    //if (!((i - 2 + 5) * this.size >= this.x - this.x_offset)){
    //    console.log(2, (i - 2 + 5) * this.size, this.x - this.x_offset);
    //}
    //if (!((j - 2) * this.size <= this.y - this.y_offset)){
    //    console.log(3, (j - 2) * this.size, this.y - this.y_offset);
    //}
    //if (!((j - 2 + 5) * this.size >= this.y - this.y_offset)){
    //    console.log(4, (j - 2 + 5) * this.size, this.y - this.y_offset);
    //}
    this.tower_x = (i + 0.5) * this.size + this.offset;
    this.tower_y = (j + 0.5) * this.size + this.offset;
    return (i - 2) * this.size <= this.x - this.x_offset
        && (i - 2 + 5) * this.size >= this.x - this.x_offset
        && (j - 2) * this.size <= this.y - this.y_offset
        && (j - 2 + 5) * this.size >= this.y - this.y_offset;
};

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
    if (this.fire) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.ball_x, this.ball_y);
        ctx.beginPath();
        ctx.moveTo(this.ball_x + 32, this.ball_y + 32);
        ctx.lineTo(this.tower_x, this.tower_y);
        ctx.stroke();
    }
    this.fire = false;
	Entity.prototype.draw.call(this);
}

attackDude.prototype.update = function () {
 //   if (this.x < 157 && this.y === 235){
	//	this.direction = 1;
	//	this.x += 1;
	//}
	//// if (this.rannum === 0 && this.x > 150){
	//	// this.direction = 3;
	//	// this.y -= 1;
	//// }
	//if (this.rannum === 1 && this.x >= 157){
	//	this.direction = 4;
	//	this.y += 1;
	//}
	//if(this.rannum === 1 && this.y >= 310) {
	//	this.direction = 1;
	//	this.x += 1;
	//	this.y -= 1;
	//}

    //walk in the square for now
    //walk to 5,1
    if (this.x < Math.ceil(this.x_offset + this.size * 5)
        && this.y === this.y_offset) {
        this.direction = 1;
        this.x += 1;
    //walk to 5,4
    } else if (this.x === Math.ceil(this.x_offset + this.size * 5)
        && this.y < Math.ceil(this.y_offset + this.size * 4)) {
        this.direction = 4;
        this.y += 1;
    //walk to 0,4
    } else if (this.x > this.x_offset
        && this.y === Math.ceil(this.y_offset + this.size * 4)) {
        this.direction = 2;
        this.x -= 1;
    //walk to 0,0
    } else if (this.x === this.x_offset && this.y > this.y_offset) {
        this.direction = 3;
        this.y -= 1;
    }
    
    var ent = this.game.entities[0];
    for (var i = 0; i < 18; i++) {
        for (var j = 0; j < 18; j++) {
            if (ent.board[i][j] != 0 && this.collide(ent, i, j)) {
                this.fire = true;
                this.ball_x = this.x;
                this.ball_y = this.y;
            }
        }
    }

	
	Entity.prototype.update.call(this);
}


////add radius Rectangle
//function radiusRectangle(game) {
//    this.game = game;
//    this.ctx = game.ctx;
//    this.x = 5;
//    this.y = 5;
//    this.size = 41.67 * 5;
//    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/cannonball.png"), 0, 0, 64, 64, 0.2, 1, true, 1);
//}

//radiusRectangle.prototype = new Entity();
//radiusRectangle.prototype.constructor = attackDude;

//radiusRectangle.prototype.collide = function (other) {
//    return other.x > this.x && other.x < this.x + this.size && other.y > this.y && other.y < this.y + this.size;
//};

//radiusRectangle.prototype.draw = function (ctx) {
//    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
//    Entity.prototype.draw.call(this);
//    Entity.prototype.draw.call(this);
//}

//radiusRectangle.prototype.update = function () {
//    for (var i = 1; i < this.game.entities.length; i++) {
//        var ent = this.game.entities[i];
//        if (this != ent && this.collide(ent)) {
//            this.draw;
//        };
//    };
//    Entity.prototype.update.call(this);
//}


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

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    var gameboard = new GameBoard(gameEngine);
    console.log("GAME ENGINE " + gameEngine);
    console.log(gameboard);
    gameEngine.addEntity(gameboard);
    gameEngine.init(ctx);

    console.log("GAME entities count = " + gameEngine.entities.length);

    //add attacker
    var attacker = new attackDude(gameEngine);
    gameEngine.addEntity(attacker);
    var timesRun = 1;

    gameEngine.start();

    //repeatly add attacker
    var interval = setInterval(function () {
        var attacker = new attackDude(gameEngine);
        gameEngine.addEntity(attacker);
        timesRun += 1;
        if (timesRun === 5) {//count of enemy
            clearInterval(interval);
        }
    }, 2000); 

});
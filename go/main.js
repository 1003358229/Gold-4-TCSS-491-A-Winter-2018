// GameBoard code below

function GameBoard(game) {
    Entity.call(this, game, 20, 20);
    this.grid = false;
    this.player = 1;
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

GameBoard.prototype.update = function () {
    if (this.game.click 
		&& this.game.click.x > -1 && this.game.click.x < 18 && this.game.click.y > -1 && this.game.click.y < 18 
		&& this.board[this.game.click.x][this.game.click.y] === 0) {
        this.board[this.game.click.x][this.game.click.y] = this.player;
		
        // this.player = this.player === 1 ? 2 : 1;
    }
	if (this.game.click && this.game.click.x === 21 && this.game.click.y === 1) {
        this.player = 1;
    }
	if (this.game.click && this.game.click.x === 21 && this.game.click.y === 2) {
        this.player = 2;
    }
    Entity.prototype.update.call(this);
}

GameBoard.prototype.draw = function (ctx) {
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/960px-Blank_Go_board.png"), this.x, this.y, 800, 800);
	
    var size = 41.67;
    var offset = 45;
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/black.png"), 21 * size + offset, size + offset, 40, 40);
	ctx.drawImage(ASSET_MANAGER.getAsset("./img/white.png"), 21 * size + offset, 2 * size + offset, 40, 40);

    for (var i = 0; i < 22; i++) {
        for (var j = 0; j < 18; j++) {
			// shows the grid of each image placement
            ctx.strokeStyle = "Green";
            ctx.strokeRect(i * size + offset, j * size + offset, size, size);

            if (this.board[i][j] === 1) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/black.png"), i * size + offset, j * size + offset, 40, 40);
            }
            if (this.board[i][j] === 2) {
				ctx.drawImage(ASSET_MANAGER.getAsset("./img/white.png"), i * size + offset, j * size + offset, 40, 40);
            }
        }
    }

    // draw mouse shadow
    if (this.game.mouse) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        if(this.player === 1) ctx.drawImage(ASSET_MANAGER.getAsset("./img/black.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset, 40, 40);
        if(this.player === 2)  ctx.drawImage(ASSET_MANAGER.getAsset("./img/white.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset, 40, 40);
        ctx.restore();
    }
}



// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var gameboard = new GameBoard(gameEngine);
    gameEngine.addEntity(gameboard);
 
    gameEngine.init(ctx);
    gameEngine.start();
});

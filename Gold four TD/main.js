//TCSS491 2018

//Edited by
//Dongsheng Han
//Karan Kurbur
//Dirk Sexton

var towerDamages = [50, 95, 35, 80, 90, 95, 100, 150];
var towerRanges = [2, 2, 4, 1, 3, 2, 2, 1];
var towerSpeed = [50, 75, 30, 40, 70, 50, 80, 120];


//Gameboard
function GameBoard(game,gameLevel) {
    Entity.call(this, game, 20, 20);
    this.range_x = 0;
    this.range_y = 0;
    this.display_range = false;
    this.score = 0;
    this.money = 1000;
    this.canBuy = true;
    this.purchaes_and_placed = false;
    this.player = 0;
    this.level = gameLevel;
    this.board = [];
    for (var i = 0; i <= 18; i++) {
        this.board.push([]);
        for (var j = 0; j <= 18; j++) {
            this.board[i].push(0);
        }
    }


    if (this.level == 1) {
        //Save Path in board 2d array
        this.board[0][5] = 10;
        this.board[1][5] = 10;
        this.board[2][5] = 10;
        this.board[3][5] = 10;
        this.board[3][6] = 10;
        for (var xcoord = 3; xcoord <= 17; xcoord++) {
            this.board[xcoord][7] = 10;
        }
    }


    if (this.level == 2) {
        for (var coord = 0; coord <= 3; coord++) {
            this.board[coord][3] = 10;
        }
        for (var coord = 0; coord <= 9; coord++) {
            this.board[4][3+coord] = 10;
        }
        for (var coord = 0; coord <= 3; coord++) {
            this.board[4+coord][13] = 10;
        }
        for (var coord = 0; coord <= 3; coord++) {
            this.board[4+coord][13] = 10;
        }
        for (var coord = 0; coord <= 11; coord++) {
            this.board[8][13-coord] = 10;
        }
        for (var coord = 0; coord <= 2; coord++) {
            this.board[9+coord][2] = 10;
        }
        for (var coord = 0; coord <= 2; coord++) {
            this.board[9+coord][2] = 10;
        }
        for (var coord = 0; coord <= 12; coord++) {
            this.board[11][3+coord] = 10;
        }
        for (var coord = 0; coord <= 8; coord++) {
            this.board[10-coord][15] = 10;
        }
        this.board[2][16] = 10;
        for (var coord = 0; coord <= 12; coord++) {
            this.board[2+coord][17] = 10;
        }
        for (var coord = 0; coord <= 12; coord++) {
            this.board[14][16-coord] = 10;
        }
        this.board[15][4] = 10;

        for (var coord = 0; coord <= 13; coord++) {
            this.board[16][4+coord] = 10;
        }
        

    }

    if(this.level == 3) {
        // for (var coord = 0; coord <= 3; coord++) {
        //     this.board[coord][3] = 10;
        // }
        for (var coord = 0; coord <= 4; coord++) {
            this.board[3][0+coord] = 10;
        }
        this.board[2][4] = 10;
        this.board[1][4] = 10;
        for (var coord = 0; coord <= 3; coord++) {
            this.board[1][5+coord] = 10;
        }
        for (var coord = 0; coord <= 3; coord++) {
            this.board[2+coord][8] = 10;
        }
        for (var coord = 0; coord <= 6; coord++) {
            this.board[5][7-coord] = 10;
        }
        this.board[6][1] = 10;
        for (var coord = 0; coord <= 10; coord++) {
            this.board[7][1+coord] = 10;
        }
        for (var coord = 0; coord <= 3; coord++) {
            this.board[6-coord][11] = 10;
        }
        for (var coord = 0; coord <= 5; coord++) {
            this.board[2][11+coord] = 10;
        }
        for (var coord = 0; coord <= 2; coord++) {
            this.board[3+coord][16] = 10;
        }
        this.board[5][15] = 10;
        this.board[5][14] = 10;
        for (var coord = 0; coord <= 8; coord++) {
            this.board[5+coord][13] = 10;
        }
        for (var coord = 0; coord <= 10; coord++) {
            this.board[13][13-coord] = 10;
        }
        this.board[11][3] = 10;
        this.board[12][3] = 10;
        for (var coord = 0; coord <= 8; coord++) {
            this.board[11][3+coord] = 10;
        }
        this.board[10][11] = 10;
        for (var coord = 0; coord <= 10; coord++) {
            this.board[9][11-coord] = 10;
        }
        for (var coord = 0; coord <= 5; coord++) {
            this.board[10+coord][1] = 10;
        }
        for (var coord = 0; coord <= 13; coord++) {
            this.board[15][2+coord] = 10;
        }
        for (var coord = 0; coord <= 4; coord++) {
            this.board[10+coord][15] = 10;
        }       
        this.board[10][16] = 10;
        this.board[10][17] = 10;

    }

}


GameBoard.prototype = new Entity();
GameBoard.prototype.constructor = GameBoard;

GameBoard.prototype.update = function () {
    //if clicked inside the map
    if (this.game.click
        && this.game.click.x > -1 && this.game.click.x < 18
        && this.game.click.y > -1 && this.game.click.y < 18) {

        //place tower on an empty space (player = 0)
        if (this.board[this.game.click.x][this.game.click.y] === 0) {
            //changed from false to true to avoid bug
            var canAfford = true;
            //I want to not display the shadow after a success purchase of tower
            purchaes_and_placed = false;

            //Using this.canBuy to determine if to draw shadow and if you can place another tower
            //DONE: modify this.canBuy outside of click loop to fix small bug where you
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
            } else {
                canAfford = false;
            }

            //place down the tower
            if (canAfford) {
                this.board[this.game.click.x][this.game.click.y] = this.player;
                purchaes_and_placed = true;
                this.player = 0;
                var newTower = new tower1(gameEngine, this.game.click.x, this.game.click.y);
                gameEngine.addEntity(newTower);
            } else {
                this.canBuy = false;
            }

            //not draw range for tower not already been placed
            this.range_x = this.game.click.x;
            this.range_y = this.game.click.y;
            this.display_range = false;
        }


        //draw range for tower already been placed
        if (this.board[this.game.click.x][this.game.click.y] != 0 && this.board[this.game.click.x][this.game.click.y] != 10) {
            this.range_x = this.game.click.x;
            this.range_y = this.game.click.y;
            this.display_range = true;
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
    if (this.game.click && this.game.click.x === 20 && this.game.click.y === 5 && this.money >= 75) {
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
    if (this.game.click && this.game.click.x === 20 && this.game.click.y === 11 && this.money >= 275) {
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
    var size = 41.67;
    var offset = 45;

    //Draw tiles for board
    //ctx.drawImage(ASSET_MANAGER.getAsset("./img/960px-Blank_Go_board.png"), this.x, this.y, 800, 800);
    for (var i = 0; i <= 17; i++) {
        for (var j = 0; j <= 17; j++) {
            if (this.board[i][j] != 10) {
                ctx.fillStyle = '#20d00d';
                ctx.fillRect(i * size + offset, j * size + offset, size, size);
            } else if (this.board[i][j] == 10) {
                ctx.fillStyle = '#985905';
                ctx.fillRect(i * size + offset, j * size + offset, size, size);
            }
        }
    }
    for (var a = 0; a <= 17; a++) {
        ctx.beginPath();
        ctx.moveTo(a * size + offset, offset);
        ctx.lineTo(a * size + offset, 18 * size + offset);
        ctx.stroke();
    }
    for (var b = 0; b <= 17; b++) {
        ctx.beginPath();
        ctx.moveTo(offset, b * size + offset);
        ctx.lineTo(18 * size + offset, b * size + offset);
        ctx.stroke();
    }


    //Score, money, level counters, and price of towers
    ctx.font = "25px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + this.score, 45, 40);
    ctx.fillText("Level: " + this.level, 225, 40);
    ctx.fillText("Money: " + this.money, 420, 40);
    ctx.fillText("Towers", 865, 40);
    ctx.fillText("$50", 930, 120);
    ctx.fillText("$100", 930, 200);
    ctx.fillText("$75", 930, 280);
    ctx.fillText("$125", 930, 360);
    ctx.fillText("$150", 930, 440);
    ctx.fillText("$275", 930, 520);
    ctx.fillText("$150", 930, 600);
    ctx.fillText("$350", 930, 680);

    //Draw tower menu
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower1.png"), 20 * size + offset, size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower2.png"), 20 * size + offset, 3 * size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), 20 * size + offset, 5 * size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower4.png"), 20 * size + offset, 7 * size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower5.png"), 20 * size + offset, 9 * size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower6.png"), 20 * size + offset, 11 * size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower7.png"), 20 * size + offset, 13 * size + offset - 20, 40, 60);
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower8.png"), 20 * size + offset, 15 * size + offset - 20, 40, 60);

    // draw mouse shadow with tower and its range
    if (this.game.mouse && this.canBuy && !this.purchaes_and_placed) {
        ctx.save();
        ctx.globalAlpha = 0.25;
        if (this.player === 1) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower1.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 2) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower2.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 3) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower3.png"), this.game.mouse.x * size + offset + 3, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 4) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower4.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 5) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower5.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 6) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower6.png"), this.game.mouse.x * size + offset + 3, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 7) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower7.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);
        if (this.player === 8) ctx.drawImage(ASSET_MANAGER.getAsset("./img/tower8.png"), this.game.mouse.x * size + offset, this.game.mouse.y * size + offset - 20, 40, 60);

        //draw range for tower
        if (this.player != 0) {
            var towerRange = towerRanges[this.player - 1];
            var boxSize = towerRange * 2 + 1;
            ctx.beginPath();
            ctx.rect(offset + (this.game.mouse.x - towerRange) * size, offset + (this.game.mouse.y - towerRange) * size, size * boxSize, size * boxSize);


            //ctx.rect(offset + (this.game.mouse.x - 2) * size, offset + (this.game.mouse.y - 2) * size, size * 5, size * 5);


            ctx.lineWidth = "10";
            ctx.strokeStyle = "blue";
            ctx.stroke();
        }
        ctx.restore();
    }

    //draw range for tower when clicked
    if (this.board[this.range_x][this.range_y] != 0) {
        ctx.beginPath();

        var towerRange = towerRanges[this.board[this.range_x][this.range_y] - 1];
        var boxSize = towerRange * 2 + 1;


        //ctx.rect(offset + (this.range_x-2)*size, offset + (this.range_y-2)*size, size * 5, size * 5);

        ctx.rect(offset + (this.range_x - towerRange) * size, offset + (this.range_y - towerRange) * size, size * boxSize, size * boxSize);


        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }
    ctx.restore();

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
function tower1(game, x, y) {
    this.boardX = x;
    this.boardY = y;
    this.game = game;
    this.ctx = game.ctx;
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/cannonball.png"), 0, 0, 420, 420, 0.2, 1, true, 0.1);
    this.x;
    this.y;
    this.size = 41.67;
    this.offset = 45;
    this.fire = false;//boolean use to decide weather to draw bullet
    this.fire_distance = 0;//this is use to keep track of the bullet position
    //this.towerRange; //EX = 2; Can attack 5x5 square with tower in center.
    //this.fireRate; //this is the bullet speed and fire rate of the tower
    this.attackingEnt = null;//keep the bullet attacking same enemy when walking out of range
    this.inRangeEnt;//keep the bullet attacking same enemy when walking out of range
    this.attackingEntX;//keep the bullet attacking same enemy when dead
    this.attackingEntY;//keep the bullet attacking same enemy when dead

    this.tower = this.game.entities[0].board[this.boardX][this.boardY];
    this.fireRate = towerSpeed[this.tower - 1];
    this.towerRange = towerRanges[this.tower - 1];

    if (this.tower == 1) {
        //this.towerRange = 2; //Can attack 5x5 square with tower in center.
        //this.fireRate = 50; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/cannonball.png"), 0, 0, 420, 420, 0.2, 1, true, 0.1);
    } else if (this.tower == 2) {
        //this.towerRange = 4; //Can attack 5x5 square with tower in center.
        //this.fireRate = 150; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/mario bullet.png"), 0, 0, 420, 420, 0.2, 1, true, 0.25);
    } else if (this.tower == 3) {
        //this.towerRange = 2; //Can attack 5x5 square with tower in center.
        //this.fireRate = 25; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bomb 3.png"), 0, 0, 420, 420, 0.2, 1, true, 0.01);
    } else if (this.tower == 4) {
        //this.towerRange = 2; //Can attack 5x5 square with tower in center.
        //this.fireRate = 25; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/crosshair.png"), 0, 0, 600, 600, 0.2, 1, true, 0.05);
    } else if (this.tower == 5) {
        // this.towerRange = 2; //Can attack 5x5 square with tower in center.
        //this.fireRate = 25; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/grenade.png"), 0, 0, 420, 420, 0.2, 1, true, 0.4);
    } else if (this.tower == 6) {
        //this.towerRange = 2; //Can attack 5x5 square with tower in center.
        //this.fireRate = 25; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/nuke.png"), 0, 0, 420, 420, 0.2, 1, true, 0.4);
    } else if (this.tower == 7) {
        //this.towerRange = 2; //Can attack 5x5 square with tower in center.
        //this.fireRate = 25; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bomb 2.png"), 0, 0, 420, 420, 0.2, 1, true, .05);
    } else if (this.tower == 8) {
        //this.towerRange = 4; //Can attack 5x5 square with tower in center.
        //this.fireRate = 25; //this is the bullet speed and fire rate of the tower
        this.animation = new Animation(ASSET_MANAGER.getAsset("./img/firework.png"), 0, 0, 420, 420, 0.2, 1, true, 0.3);
    }
}

tower1.prototype = new Entity();
tower1.prototype.constructor = tower1;

tower1.prototype.draw = function (ctx) {
    //draw tower base on the infor stored in the game board
    var joined = ['./img/tower', this.tower, '.png'].join('');
    ctx.drawImage(ASSET_MANAGER.getAsset(joined), this.boardX * this.size + this.offset, this.boardY * this.size + this.offset - 20, 40, 60);

    //draw bullet
    if (this.fire) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
};

tower1.prototype.update = function (ctx) {
    //loop through all entities in game engine
    var isInrange;
    this.fire = false;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && ent.isAttacker == 1) { //if Entity is an enemy, should check to see if it is in range.
            isInrange = this.inRange(ent.boardX, ent.boardY);
            if (isInrange) {
                this.fire = true;
                this.inRangeEnt = ent;
                if (this.attackingEnt == null) {
                    this.attackingEnt = this.inRangeEnt;
                }
                if (this.attackingEnt != null && this.attackingEnt != this.inRangeEnt){
                    continue;
                }
                break;
            } else {
                this.fire = false;
                this.inRangeEnt = null;
            }
        };
    };

    //keep attacking the same target when bullet already shooted but not yet hit
    if (this.attackingEnt != this.inRangeEnt
        && !this.inRange(this.attackingEnt.boardX, this.attackingEnt.boardY)
        && this.fire_distance != 0) {
        this.fire = true;
    } else {
        this.attackingEnt = this.inRangeEnt;
    }

    if (this.attackingEnt != null) {
        this.attackingEntX = this.attackingEnt.x;//keep the bullet attacking same enemy when dead
        this.attackingEntY = this.attackingEnt.y;//keep the bullet attacking same enemy when dead
    }


    //if the enemy is in range, shoot and change health and score
    if (this.fire) {
        (this.attackingEntX + 6) < (this.boardX * this.size + this.offset)
            ? this.x = (this.boardX * this.size + this.offset)
            - this.fire_distance * Math.abs((this.attackingEntX + 6) - (this.boardX * this.size + this.offset)) / this.fireRate
            : this.x = (this.boardX * this.size + this.offset)
            + this.fire_distance * Math.abs((this.attackingEntX + 6) - (this.boardX * this.size + this.offset)) / this.fireRate;

        (this.attackingEntY + 10) < (this.boardY * this.size + this.offset)
            ? this.y = (this.boardY * this.size + this.offset)
            - this.fire_distance * Math.abs((this.attackingEntY + 10) - (this.boardY * this.size + this.offset)) / this.fireRate
            : this.y = (this.boardY * this.size + this.offset)
            + this.fire_distance * Math.abs((this.attackingEntY + 10) - (this.boardY * this.size + this.offset)) / this.fireRate;

        if (this.fire_distance < this.fireRate) {
            this.fire_distance++;
        } else {
            if (this.attackingEnt != null) {
                var towerDamage = towerDamages[this.tower - 1];

                this.attackingEnt.health = this.attackingEnt.health - towerDamage; //Grab tower damage info from global array
                this.game.entities[0].score += towerDamage;
            }
            this.fire_distance = 0;
        }
    }

    Entity.prototype.update.call(this);
};

//use to test if the enemy is in range, currently using a square
tower1.prototype.inRange = function (x, y) {
    return x <= this.boardX + this.towerRange
        && x >= this.boardX - this.towerRange
        && y <= this.boardY + this.towerRange
        && y >= this.boardY - this.towerRange;
}


//add attacker
function attackDude(game, attacker) {
    this.scale = 0.8;

    //Regular enemy
    this.animationR = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 128, 64, 64, 0.2, 4, true, this.scale);
    this.animationL = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 64, 64, 64, 0.2, 4, true, this.scale);
    this.animationU = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 192, 64, 64, 0.2, 4, true, this.scale);
    this.animationD = new Animation(ASSET_MANAGER.getAsset("./img/Attack.png"), 0, 0, 64, 64, 0.2, 4, true, this.scale);
    //Green fast enemy
    this.animationR1 = new Animation(ASSET_MANAGER.getAsset("./img/Attack1.png"), 0, 128, 64, 64, 0.2, 4, true, this.scale);
    this.animationL1 = new Animation(ASSET_MANAGER.getAsset("./img/Attack1.png"), 0, 64, 64, 64, 0.2, 4, true, this.scale);
    this.animationU1 = new Animation(ASSET_MANAGER.getAsset("./img/Attack1.png"), 0, 192, 64, 64, 0.2, 4, true, this.scale);
    this.animationD1 = new Animation(ASSET_MANAGER.getAsset("./img/Attack1.png"), 0, 0, 64, 64, 0.2, 4, true, this.scale);
    //Blue slow enemy
    this.animationR2 = new Animation(ASSET_MANAGER.getAsset("./img/Attack2.png"), 0, 128, 64, 64, 0.2, 4, true, this.scale);
    this.animationL2 = new Animation(ASSET_MANAGER.getAsset("./img/Attack2.png"), 0, 64, 64, 64, 0.2, 4, true, this.scale);
    this.animationU2 = new Animation(ASSET_MANAGER.getAsset("./img/Attack2.png"), 0, 192, 64, 64, 0.2, 4, true, this.scale);
    this.animationD2 = new Animation(ASSET_MANAGER.getAsset("./img/Attack2.png"), 0, 0, 64, 64, 0.2, 4, true, this.scale);
    //Red boss enemy
    this.animationR3 = new Animation(ASSET_MANAGER.getAsset("./img/Attack3.png"), 0, 128, 64, 64, 0.2, 4, true, this.scale);
    this.animationL3 = new Animation(ASSET_MANAGER.getAsset("./img/Attack3.png"), 0, 64, 64, 64, 0.2, 4, true, this.scale);
    this.animationU3 = new Animation(ASSET_MANAGER.getAsset("./img/Attack3.png"), 0, 192, 64, 64, 0.2, 4, true, this.scale);
    this.animationD3 = new Animation(ASSET_MANAGER.getAsset("./img/Attack3.png"), 0, 0, 64, 64, 0.2, 4, true, this.scale);
    //this.death = new Animation(ASSET_MANAGER.getAsset("./img/ex.png"), 0, 0, 128, 128, 0.1, 10, true, this.scale);
    //spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, scale) 

    //this.direction = 1;//1R 2L 3U 4D
    this.direction = 0;
    this.size = 41.67;
    this.offset = 45;
    this.x_offset = 38;
    this.y_offset = 35;
    //this.x = this.x_offset;
    //this.y = Math.ceil(this.y_offset + this.size * 5);
    this.x;
    this.y;
    this.isAttacker = 1;//use to indicate that this is a enemy(tower1.prototype.update)
    this.game = game;
    this.ctx = game.ctx;
    this.boardX;
    this.boardY;
    this.attacker = attacker

    if (this.attacker == 0) {
        this.health = 250;
        this.speed = 1;
    } else if (this.attacker == 1) {
        this.health = 200;
        this.speed = 2.5;
    } else if (this.attacker == 2) {
        this.health = 1000;
        this.speed = .5;
    } else if (this.attacker == 3) {
        this.health = 1000;
        this.speed = 2;
    }

}

attackDude.prototype = new Entity();
attackDude.prototype.constructor = attackDude;

attackDude.prototype.draw = function (ctx) {
    ctx.save();

    //draw four direction of enemy
    if (this.attacker == 0) {
        if (this.direction === 1) {
            this.animationR.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 2) {
            this.animationL.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 3) {
            this.animationU.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 4) {
            this.animationD.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    } else if (this.attacker == 1) {
        if (this.direction === 1) {
            this.animationR1.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 2) {
            this.animationL1.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 3) {
            this.animationU1.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 4) {
            this.animationD1.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    } else if (this.attacker == 2) {
        if (this.direction === 1) {
            this.animationR2.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 2) {
            this.animationL2.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 3) {
            this.animationU2.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 4) {
            this.animationD2.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    } else if (this.attacker == 3) {
        if (this.direction === 1) {
            this.animationR3.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 2) {
            this.animationL3.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 3) {
            this.animationU3.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if (this.direction === 4) {
            this.animationD3.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }

    //draw health
    if (this.health > 0) {
        ctx.strokeStyle = "red";
        ctx.strokeText("Hp: " + this.health, this.x, this.y);
    }

    //delete entities when health = 0, and play sound.
    //TODO: draw death animation(not important for now)
    if (this.health <= 0) {
        //this.death.drawFrame(this.game.clockTick, ctx, this.x, this.y);//function attackDude(game) {this.death. and assert manager
        var snd = new Audio("explosion.mp3"); // buffers automatically when created
        snd.play();
        this.game.entities[0].money += 500;
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (this === ent) {
                this.game.entities.splice(i, 1);
            };
        };
    }

    // Game over message
    if (this.x > 745 || this.y > 745) {
        ctx.font = "75px Arial";
        ctx.lineWidth = 8;
        ctx.strokeStyle = "black";
        ctx.strokeText("Game Over ", 250, 400);
        ctx.fillStyle = 'white';
        ctx.fillText("Game Over ", 250, 400);
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent.isAttacker == 1) { //if Entity is an enemy, should check to see if it is in range.
                ent.speed = 0;
            } else {
                ent.towerRange = 0;
            }
            count = 5;//stop add new enemy
        };
    }
    ctx.restore();

    ////red circle around dog
    //ctx.beginPath();
    //ctx.lineWidth="6";
    //ctx.rect(this.x + 6, this.y + 10, 1, 1);
    //ctx.stroke();
    //ctx.lineWidth="1";
    //ctx.rect(this.x + 6, this.y + 10, this.size, this.size);
    //ctx.stroke();

    Entity.prototype.draw.call(this);
}



attackDude.prototype.update = function () {
    this.direction = this.DD(this.direction);
    //// walk to 3,5
    //if (this.x < Math.ceil(this.x_offset + this.size * 3)
    //    && this.y === Math.ceil(this.y_offset + this.size * 5)) {
    //    this.direction = 1;
    //    this.x += 1 * this.speed;
    //    if (this.x > Math.ceil(this.x_offset + this.size * 3)) {
    //        this.x = Math.ceil(this.x_offset + this.size * 3);
    //    }
    //    //walk to 3,7
    //} else if (this.x === Math.ceil(this.x_offset + this.size * 3)
    //    && this.y < Math.ceil(this.y_offset + this.size * 17)) {
    //    this.direction = 4;
    //    this.y += 1 * this.speed;
    //    if (this.y > Math.ceil(this.y_offset + this.size * 7)) {
    //        this.y = Math.ceil(this.y_offset + this.size * 7);
    //    }
    //    //walk to 17,7
    //} else if (this.x < Math.ceil(this.x_offset + this.size * 17)
    //    && this.y === Math.ceil(this.y_offset + this.size * 7)) {
    //    this.direction = 1;
    //    this.x += 1 * this.speed;
    //    if (this.x > Math.ceil(this.x_offset + this.size * 17)) {
    //        this.x = Math.ceil(this.x_offset + this.size * 17);
    //    }
    //}

    //make it paralle to board axis instead of actuall axis
    var changedX = Math.floor((this.x + 6 - this.x_offset) / this.size);
    if (changedX != this.boardX) {
        this.boardX = changedX;
    }
    var changedY = Math.floor((this.y +10 - this.y_offset) / this.size);
    if (changedY != this.boardY) {
        this.boardY = changedY;
    }

    Entity.prototype.update.call(this);
}

//TODO: do a directrion decision to make the dog walking
//1R 2L 3U 4D
attackDude.prototype.DD = function (direction) {
    if (direction == 0){
        for (var i = 0; i <= 17; i++) {
            if (this.game.entities[0].board[0][i] == 10) {
                direction = 1;
                this.x = this.x_offset;
                this.y = Math.ceil(this.y_offset + this.size * i);
            } else if (this.game.entities[0].board[i][0] == 10) {
                direction = 4;
                this.x = Math.ceil(this.x_offset + this.size * i);
                this.y = this.y_offset;
            }
        }
    }
    else if (direction == 1) {
        this.x += 1 * this.speed;
        if (this.game.entities[0].board[this.boardX + 1][this.boardY] != 10 && this.x > Math.ceil(this.x_offset + this.size * this.boardX)) {
            if (this.game.entities[0].board[this.boardX][this.boardY + 1] == 10) {
                direction = 4;
                this.x = Math.ceil(this.x_offset + this.size * this.boardX)
            } else if (this.game.entities[0].board[this.boardX][this.boardY - 1] == 10) {
                direction = 3;
                this.x = Math.ceil(this.x_offset + this.size * this.boardX)
            }
        }
    } 
    else if (direction == 2) {
        this.x -= 1 * this.speed;
        if (this.game.entities[0].board[this.boardX - 1][this.boardY] != 10 && this.x < Math.ceil(this.x_offset + this.size * this.boardX)) {
            if (this.game.entities[0].board[this.boardX][this.boardY + 1] == 10) {
                direction = 4;
                this.x = Math.ceil(this.x_offset + this.size * this.boardX)
            } else if (this.game.entities[0].board[this.boardX][this.boardY - 1] == 10) {
                direction = 3;
                this.x = Math.ceil(this.x_offset + this.size * this.boardX)
            }
        }
    }
    else if (direction == 3) {
        this.y -= 1 * this.speed;
        if (this.game.entities[0].board[this.boardX][this.boardY - 1] != 10 && this.y < Math.ceil(this.y_offset + this.size * this.boardY)) {
            if (this.game.entities[0].board[this.boardX + 1][this.boardY] == 10) {
                direction = 1;
                this.y = Math.ceil(this.y_offset + this.size * this.boardY)
            } else if (this.game.entities[0].board[this.boardX - 1][this.boardY] == 10) {
                direction = 2;
                this.y = Math.ceil(this.y_offset + this.size * this.boardY)
            }
        }
    } 
    else if (direction == 4) {
        this.y += 1 * this.speed;
        if (this.game.entities[0].board[this.boardX][this.boardY + 1] != 10 && this.y > Math.ceil(this.y_offset + this.size * this.boardY)) {
            if (this.game.entities[0].board[this.boardX + 1][this.boardY] == 10) {
                direction = 1;
                this.y = Math.ceil(this.y_offset + this.size * this.boardY)
            } else if (this.game.entities[0].board[this.boardX - 1][this.boardY] == 10) {
                direction = 2;
                this.y = Math.ceil(this.y_offset + this.size * this.boardY)
            }
        }
    }
    return direction;
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
ASSET_MANAGER.queueDownload("./img/Attack1.png");
ASSET_MANAGER.queueDownload("./img/Attack2.png");
ASSET_MANAGER.queueDownload("./img/Attack3.png");
ASSET_MANAGER.queueDownload("./img/cannonball.png");
ASSET_MANAGER.queueDownload("./img/mario bullet.png");
ASSET_MANAGER.queueDownload("./img/ex.png");



ASSET_MANAGER.queueDownload("./img/crosshair.png");
ASSET_MANAGER.queueDownload("./img/grenade.png");
ASSET_MANAGER.queueDownload("./img/bomb 2.png");
ASSET_MANAGER.queueDownload("./img/nuke.png");
ASSET_MANAGER.queueDownload("./img/bomb 3.png");
ASSET_MANAGER.queueDownload("./img/firework.png");


var gameEngine = new GameEngine();
var count;
ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameboard = new GameBoard(gameEngine,3);
    console.log("GAME ENGINE " + gameEngine);
    console.log(gameboard);
    gameEngine.addEntity(gameboard);
    gameEngine.init(ctx);
    console.log("GAME entities count = " + gameEngine.entities.length);

    var timeInterval = 5000;//add every timeInterval/1000 second
    count = 0;
    var attacker = new attackDude(gameEngine, 1);
    gameEngine.addEntity(attacker);
    gameEngine.start();
    // //repeatly add attacker after game start 
    // var interval = setInterval(function () {
    //     if (count === 5) {
    //         clearInterval(interval);
    //     }
    //     console.log(count + "THIS IS COUNT");
    
    //     var attacker = new attackDude(gameEngine, count);
    //     gameEngine.addEntity(attacker);
    //     count++;
    // }, timeInterval);

});
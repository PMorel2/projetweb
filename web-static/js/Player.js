var Player = function(assetManager){
	var self = this;
	Character.call(this);
	
	
	$(document).keyup(function(e){
	
		console.log("up" + e.which);
		
		self.onKeyUp(e.which);
	});
	
	$(document).keydown(function(e){
		console.log("keydown" + e.which);
		
		self.onKeyDown(e.which);

	});
	
	this.speed = {
		x: 600,
		y: 200
	};

	this.createSprite("idle", assetManager.getImage("player-idle"), 2048, 256, 16, 2, true);
	this.createSprite("attack", assetManager.getImage("player-attack"), 2048, 128, 16, 1, false);
	this.createSprite("move", assetManager.getImage("player-move"), 896, 128, 7, 1, true);
	
	this.centerX = 64;
	this.centerY = 120
	
	for(var i in this.spriteList){
		this.spriteList[i].setCenter(this.centerX, this.centerY);
	}
	
	this.spriteList["move"].frameCount = 6;
	this.revertDirection = false
	this.setSprite("idle");

	this.keyList = {};
	/*this.spriteList["move-left"].frameCount = 6;
	this.spriteList["move-right"].frameCount = 6;
	this.revertDirection = false;
	this.setSprite("idle");*/
};
Player.MIN_Y = 1455;
Player.MAX_Y = 1920;
Player.MIN_SCALE = 0.5;
Player.MAX_SCALE = 1.3;

Player.prototype = new Character();
Player.prototype.init = function(){
};
Player.prototype.setPosition = function(x, y){
	var lastY = this.y;
	Character.prototype.setPosition.call(this, x, y);
	
	if(this.y != lastY){
		var factor = (y - Player.MIN_Y) / (Player.MAX_Y - Player.MIN_Y);
		this.setScale(factor * (Player.MAX_SCALE - Player.MIN_SCALE) + Player.MIN_SCALE);
	}
};

Player.prototype.setScale = function(scale){
        this.scale = scale;
        for(var i in this.spriteList){
                this.spriteList[i].setScale(this.scale);
        }
};

Player.prototype.update = function(deltaTime){
	var move = {x: 0, y: 0};
	
	// Q (113|81)
	if(this.keyList[81] || this.keyList[113]){
		move.x = -1;
		this.revertDirection = true;
	}
	// S (115|83)
	if(this.keyList[115] || this.keyList[83]){
		move.y = 1;
	}

	// D (100|68)
	if(this.keyList[100] || this.keyList[68]){
		move.x = 1;
		this.revertDirection = false;
	}

	// Z (122|90)
	if(this.keyList[122] || this.keyList[90]){
		move.y = -1;
	}

	if(move.x !=0 || move.y != 0){
		this.move(move.x * this.speed.x * this.scale * deltaTime, move.y * this.speed.y * this.scale * deltaTime);
		this.setSprite("move");
	}else{
		this.setSprite("idle");
	}

};

Player.prototype.onKeyDown = function(k){
	this.keyList[k] = true;
	//space
	if(k == 32){
		this.setSprite("attack");
		
		
	}

};
Player.prototype.onKeyUp = function(k){
	this.keyList[k] = false;
};
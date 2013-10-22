var Camera = function(scene, player){
	var self = this;
	
	this.scene = scene;
	this.player = player;
	
	this.player.addPositionListener(function(x, y){
		self.refreshView(x, y);
	});			///////////////////////////////////////////////////////////////////////////////////////
	
	this.x = 0;
	this.y = 0;
	
	this.decalX = 512;
	this.decalY = 300;

};
Camera.SCREEN_WIDTH = 1024;
Camera.SCREEN_HEIGHT = 600;
Camera.SCENE_WIDTH = 4096;
Camera.SCENE_HEIGHT = 2037;
Camera.MIN_X = -Camera.SCENE_WIDTH + Camera.SCREEN_WIDTH;
Camera.MAX_X = 0;
Camera.MIN_Y = -Camera.SCENE_HEIGHT + Camera.SCREEN_HEIGHT;
Camera.MAX_Y = 0;

Camera.prototype.refreshView = function(playerX, playerY){
	var self = this;
	var newX = -playerX + this.decalX;
	var newY = -playerY + this.decalY;
	if(newX < Camera.MIN_X){
		newX = Camera.MIN_X;
	}else if(newX > Camera.MAX_X){
		newX = Camera.MAX_X;
	}
	if(newY < Camera.MIN_Y){
		newY = Camera.MIN_Y;
	}else if(newY > Camera.MAX_Y){
		newY = Camera.MAX_Y;
	}
	
	$.ease({x: this.x, y: this.y}, {x: newX, y: newY}, function(o){						///////////////////////////////////////////////////////////////////////////////////////////
		self.legacyX = Math.round(o.x);
		self.legacyY = Math.round(o.y);
		self.setViewPosition(Math.round(o.x), Math.round(o.y));
	},  {
		duration: 200,
		easing: "easeOutExpo"
	});
};
Camera.SHAKE_SCREEN_DURATION = 200;
Camera.SHAKE_SCREEN_DISTANCE = 1;
Camera.prototype.shake = function(factor){
	var self = this;
	if(!factor){
		factor = 1;
	}
	// TODO
};
Camera.prototype.setViewPosition = function(x, y){
	
	//console.log(this.x + "  " + this.y);
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.scene.css({																			////////////////////////////////////////////////////////////////////////////
		top: this.y + "px",
		left: this.x + "px"
	});
};
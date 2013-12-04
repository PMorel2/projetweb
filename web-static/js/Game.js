var Game = function(){
	var self = this;
	this.localTime = 0;
	this.globalTime = 0;
	

	//var win = new Window('main-window', document.getElementById("gui"));
	var win = new Window('main-window', document.getElementById("gui"));
	
	infoPage = new InfoPage();
	try{
		win.addPage("info", infoPage);
		win.addPage("description", new Page("<strong>hello</strong> world"));
		win.addPage("equipement", new Page("lorem ipsum"));
	}catch(e){
		console.log("New Exception : " + e);
	}
	
	infoPage.refreshData({
		name: "Johnny",
		title: "be good",
		xp: 200,
		hp: 643,
		power: 65,
		progress: 0.8
	});
	
	this.canvas = $("#main-scene").get(0);
	this.graphics = this.canvas.getContext("2d");
	
	
	var sleep = 1;
	var baseUrl = "/projetweb-static/img/getImage.php?url=";
	var imageList = {
		"background": baseUrl + "forest.jpg&sleep=" + sleep,
		"player-idle": baseUrl + "sprite/idle-1-2-1.png&sleep=" + sleep,
		"player-attack": baseUrl + "sprite/attack-1-2-1.png&sleep=" + sleep,
		"player-move": baseUrl + "sprite/move-1-2-1.png&sleep=" + sleep,
		"mob-idle": baseUrl + "sprite/idle-1.png&sleep=" + sleep,
		"mob-damage" : baseUrl + "sprite/damage-1.png&sleep=" + sleep,
		"mob-attack" : baseUrl + "sprite/attack-1.png&sleep=" + sleep,
		"mob-death" : baseUrl + "sprite/death-1.png&sleep=" + sleep	
	};
	
	var soundList = {};
	this.assetManager = new AssetManager();
	this.assetManager.startLoading(imageList, soundList);
	
	this.graphics.fillStyle = "red";
	this.graphics.fillRect(0,0, this.canvas.width, this.canvas.height);
	
	$scene = $("#main-scene");

	$("#gui").append($("<div>").button().css({position:"absolute",top:"5px",left:"5px"}).append("Menu").click(function(){
		$(win.root).toggle('fade', 200);
	}));
	$(win.root).hide();

	player = new Player(this.assetManager);
	camera = new Camera(player);
	
	this.ennemyList = [];
	
	/*var handlerTimeOut = function(){
			console.log("hello TimeOut");
		}
	
	var handlerInterval = function(){
			console.log("hello Interval");
		}*/
		
	/*setTimeout(handlerTimeOut, 100);
	setInterval(handlerInterval, 100);*/
	
	setInterval(function(){self.popEnnemy();}, 2000);
	
	this.bg = new Image();
	this.bg.src = '/projetweb-static/img/forest.jpg';

	player.setPosition(3530, 1770);
	player.init();
	
	requestAnimFrame(
		function loop() {
			self.mainLoop();
			requestAnimFrame(loop);
		}					
	);
};

Game.prototype.popEnnemy = function(){

	var ennemy = new Ennemy (this.assetManager);
	
	this.ennemyList.push(ennemy);
}
	

	
Game.prototype.checkCollision(){

	for(i = 0; i < this.ennemyList.length; i++){
			if(this.ennemyList[i].x > (player.x - player.width/2) && this.ennemyList[i].x < (player.x + player.width/2)  && this.ennemy[i].y > (player.y - player.height) && this.ennemyList[i].y < player.y
			{
				
			}
		}
}
	

Game.prototype.mainLoop = function(){
	var now = Date.now();
	var globalTimeDelta = now - this.globalTime;
	var localTimeDelta = Math.min(50, globalTimeDelta);
	this.localTime += localTimeDelta;
	
	
	this.graphics.canvas = this.canvas;
	this.graphics.drawTimeMillis = now;
	
	
	this.graphics.clearRect(0,0, this.canvas.width, this.canvas.height);
	
	if(this.assetManager.isDoneLoading()){
		this.graphics.save();
		camera.render(this.graphics);
		this.graphics.drawImage(this.assetManager.getImage("background"), 0, 0);
		if(typeof(this.loadDoneTime) == "undefined"){this.loadDoneTime = now;}
		//this.loadDoneTime = now;
		player.update(localTimeDelta / 1000);
		
		for (i = 0; i < this.ennemyList.length; i++)
		{
			if(this.ennemyList[i].y > player.y)
			{
				this.ennemyList[i].render(this.graphics);
			}
		}
		
		player.render(this.graphics);
		
		this.graphics.restore();
	}
	
	var fadeDuration = 3000;
	
	var loadingAlpha = tween(1, 0, this.assetManager.loadingEndTime, fadeDuration, "easeOut");
	
	if(!this.assetManager.isDoneLoading() || (loadingAlpha > 0)){
		this.graphics.save();		//sauvegarder le contexte
		console.log("loadingAlpha : " + loadingAlpha);
		if(this.assetManager.isDoneLoading)
		{
			this.graphics.globalAlpha = loadingAlpha;
			console.log("alpha : " + this.graphics.globalAlpha);
			
		}
		//this.graphics.clearRect(0,0, this.canvas.width, this.canvas.height);
		this.assetManager.renderLoadingProgress(this.graphics);
	
		this.graphics.globalAlpha = 1;
	
		this.graphics.fillRect(player.x, player.y, 10, 10);
	
		this.graphics.restore();	//restore le contexte
	}
};





var TWEEN_FACTOR = 1.5;
var TWEEN_EXPO_FACTOR = 4;

function tween(from, to, startTime, duration){
	var now = Date.now();
	var t = (now - startTime) / duration;
	t = Math.max(0, Math.min(1, t));
	if(typeof(easing) != "undefined"){
		switch(easing){
			case "easeOut" :
				t= Math.pow(t, 1 / TWEEN_FACTOR);
				break;
			case "easeIn" :
				t= Math.pow(t, TWEEN_FACTOR);
				break
			case "easeOutExpo" :
				t= Math.pow(t, 1 / TWEEN_EXPO_FACTOR);
				break
			case "easeInExpo" :
				t= Math.pow(t, TWEEN_EXPO_FACTOR);
				break
			case "easeOutSine" :
				t = Math.sin(t * Math.PI / 2);
				break
			case "easeInSine" :
				t = Math.sin((t - 1) * Math.PI / 2) + 1;
				break;
			case "easeInOut":
				t = Math.sin((t - 0.5) * Math.PI) / 2 + 0.5;
				break;
			}
	
	}
	
	return from + t * (to - from);
}
























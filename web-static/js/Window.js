


var Window = function(id, parent){
	this.id = id;
	this.parent = parent;
	
	this.root = document.createElement("div");
	this.root.className = "window";
	this.parent.appendChild(this.root);
	
	this.menu = document.createElement("div");
	this.menu.className = "menu";
	this.root.appendChild(this.menu);
	
	this.menuList = document.createElement("ul");
	this.menu.appendChild(this.menuList);
	
	this.content= document.createElement("div");
	this.content.className = "content";
	this.root.appendChild(this.content);
	
	this.currentPage = null;
};
Window.prototype.addPage = function(title, page){
	var self = this;

	if(!(page instanceof Page)){
		throw page + " is not instanceof Page";
	}
	
	this.content.appendChild(page.root);
	
	var li = document.createElement("li");
	this.menuList.appendChild(li);
	li.innerHTML = title;
	li.page = page;
	li.addEventListener("click", function(){
		self.showPage(li);
	});
	
	if(this.currentLink == null){
		this.showPage(li);
	}
	//...
};

Window.prototype.showPage = function(li){

	if(this.currentLink){
		this.currentLink.setAttribute("class", "");
		this.currentLink.page.setVisible(false);
	}
	this.currentLink = li;
	this.currentLink.page.setVisible(true);
	this.currentLink.setAttribute("class", "selected");
};

	

// li.addEventListener("click", function(){...});
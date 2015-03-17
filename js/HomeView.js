var HomeView = function(store) {
	
	this.findByName = function() {
        store.findByName( $('.search-key').val(), function(employees) {
        	$(".employee-list").html( HomeView.liTemplate(employees) );
        } );
    };
	
	this.displayName = function() {
		//app.showAlert("Hello World", "Hope all is well!");
	};
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('keyup', '.search-key', this.findByName);;
	};
	
	this.initialize();
	
	this.render = function() {
		this.el.html( HomeView.template() );
		return this;
	};
	
}

HomeView.template = Handlebars.compile( $("#home-tpl").html() );
HomeView.liTemplate = Handlebars.compile( $("#employee-li-tpl").html() );
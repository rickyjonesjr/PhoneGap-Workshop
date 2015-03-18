var HomeView = function(store) {
	
	this.findByName = function() {
        store.findByName( $('.search-key').val(), function(branches) {
        	$(".branch-list").html( HomeView.liTemplate(branches) );
        } );
    };
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('keyup', '.search-key', this.findByName);
	};
	
	this.initialize();
	
	this.render = function() {
		this.el.html( HomeView.template() );
		return this;
	};
	
}

HomeView.template = Handlebars.compile( $("#home-tpl").html() );
HomeView.liTemplate = Handlebars.compile( $("#branch-li-tpl").html() );
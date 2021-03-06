var branchView = function(branch) {
	
	this.render = function() {
		this.el.html( branchView.template(branch) );
		return this;
	};
	
	this.addToContacts = function(event) {
		event.preventDefault();
		
		// Create Contact
		var contact = navigator.contacts.create();
		contact.displayName = branch.firstName;
		contact.nickname = branch.firstname;
		var name = new ContactName();
		name = {givenName: branch.firstName, familyName: branch.lastName};
		contact.name = name;
		
		// Save Contact
		contact.save(onSaveSuccess,onSaveError);
	};
	
	this.onSaveSuccess = function(contact) {
		app.showAlert(contact.displayName + " has been saved to your contacts.");	
	};
	
	this.onSaveError = function(contactError) {
		app.showAlert("Error: " + contactError.code);	
	};
	
	this.changePicture = function(event) {
		event.preventDefault();
		if (!navigator.camera) {
			app.showAlert("Camera API not supported", "Error");
			return;	
		}
		var options = {	quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: 1, 		// 0=Photo Library, 1=Camera, 2=Saved Photo Album
						encodingType: 0		// 0=JPG 1=PNG
		};
		navigator.camera.getPicture(
			function(imageData) {
				$('.branch-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
			},
			function() {
				app.showAlert('Error taking picture', 'Error');
			},
			options);			
		return false;
	};
	
	this.initialize = function() {
		this.el = $('<div/>');
		this.el.on('click', '.get-directions-btn', this.getDirections);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
		this.el.on('click', '.change-pic-btn', this.changePicture);
		app.showAlert(google);
		/*var latLong = new google.maps.LatLng(branch.lat, branch.lng);
		var mapOptions = {
			center: latLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);*/
	};
	
	this.initialize();
	
}

branchView.template = Handlebars.compile( $("#branch-tpl").html() );
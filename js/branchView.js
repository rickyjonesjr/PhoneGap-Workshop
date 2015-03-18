var branchView = function(branch) {
	
	this.render = function() {
		this.el.html( branchView.template(branch) );
		return this;
	};
	
	this.getDirections = function(event) {
		event.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
				window.open("https://www.google.com/maps/embed/v1/directions?key=AIzaSyAQSGeH_3OT7gcqgi43zix-Z6CKlwMxJXI&origin=CURRENT&destination=Kinecta+Federal+Credit+Union,{{city}}+{{state}}");
			},
			function() {
				alert('Error getting location');
			});
		return false;
	};
	
	this.openGoogleMaps = function(event) {
		event.preventDefault();
		
		var ua = navigator.userAgent.toLowerCase(),
			plat = navigator.platform,
			protocol = '',
			a,
			href;
		
		$.browser.device = ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i) ? ua.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera/i)[0] : false;
		
		
		if ($.browser.device) {
			switch($.browser.device) {
				case 'iphone':
				case 'ipad':
				case 'ipod':
					function iOSversion() {
					  if (/iP(hone|od|ad)/.test(navigator.platform)) {
						// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
						var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
						return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
					  }
					}
		
					var ver = iOSversion() || [0];
		
					if (ver[0] >= 6) {
					  protocol = 'maps://';
					}
					else {
						protocol = 'http://maps.google.com/maps';
					}
				break;
		
				case 'android':
				default:
					protocol = 'http://maps.google.com/maps';
				break;
			}
		
		a.attr('href', protocol + href);
		
	}}
	
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
	};
	
	this.initialize();
	
}

branchView.template = Handlebars.compile( $("#branch-tpl").html() );
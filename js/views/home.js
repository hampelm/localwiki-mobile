LW.views.Home = Backbone.View.extend({
  
  el: $("#container"),
  
  initialize: function(options) {
    _.bindAll(this, 'render', 'map', 'onGeolocateSuccess', 'onGeolocateError');
    this.pages = new LW.collections.Pages();
    this.pages.on('reset', this.render);
  },
  
  map: function(url) {
    this.mapView = new LW.views.MapView({
      url: url,
      el: '#near-me-map'
    });
  },
  
  // Find locations nearby
  onGeolocateSuccess: function(position) {
    // Get nearby places.
    // Do we need a "nearby places" model?
    console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
  },

  onGeolocateError: function(error) {
      console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  },
  
  render: function(e) {  
    console.log("Rendering home");
    var context = { 
      pages: this.pages.toJSON()
    };
    
    this.$el.html(_.template($('#home').html(), context));    
    
    // Get pages nearby.
    // Provided by Cordova
    navigator.geolocation.getCurrentPosition(this.onGeolocateSuccess, this.onGeolocateError);
    
  }
  
});


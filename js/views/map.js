LW.views.MapView = Backbone.View.extend({
  
  initialize: function(options) {
    console.log("Initialize map view");
    _.bindAll(this, 'render', 'renderLayer', 'addLayer', 'pagesNear', 'mapInBoundsURL', 'getMapPages');
    
    this.maps = new LW.collections.Maps();
    this.render();
  },
    
  render: function() {  
    console.log("Rendering the map");
    
    // Generate a unique ID for rendering the map
    this.id = _.uniqueId('map_');
    
    var context = { 
      id: this.id
    };
    this.$el.html(_.template($('#map-view').html(), context));
    $('#map-container').show();
    
    // Create the map
    this.leafletMap = L.map(this.id).setView([42.343422,-83.06488], 13);
    L.tileLayer('http://{s}.tile.cloudmade.com/4c882e9e6a18405b817166a729cd6c68/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(this.leafletMap);    
  },
  
  renderLayer: function() {
    var layer = L.geoJson(this.map.get("geom")).addTo(this.leafletMap);
    this.leafletMap.fitBounds(layer.getBounds());
  },
  
  addLayer: function(url) {
    this.map = new LW.models.Map({url: url + '?format=json'});
    this.map.fetch();
    this.map.on('change', this.renderLayer);    
  },
  
  pagesNear: function() {
    // Get pages nearby.
    navigator.geolocation.getCurrentPosition(this.mapInBoundsURL, this.onGeolocateError);
  },
  
  // Find locations nearby
  mapInBoundsURL: function(position) {
    // Focus the map on the current location
    var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);
    this.leafletMap.setView(latlng, 12);
    
    // Get the pages in the bounds.
    this.maps.queryNear(this.leafletMap.getBounds());
    this.maps.on('reset', this.getMapPages);
  },
  
  getMapPages: function(event) {
    this.maps.getPages();
  },
  
  onGeolocateError: function(error) {
      console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
    
  
});


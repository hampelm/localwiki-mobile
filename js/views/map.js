LW.views.MapView = Backbone.View.extend({
  
  initialize: function(options) {
    console.log("Initialize map view");
    _.bindAll(this, 'render');

    this.el = $(options.el);
    
    this.map = new LW.models.Map({url: options.url + '?format=json'});
    this.map.fetch();
    
    this.map.on('change', this.render);
  },
    
  render: function() {  
    console.log("Rendering the map");
    
    // Generate a unique ID for rendering the map
    this.id = _.uniqueId('map_');
    
    var context = { 
      id: this.id
    };
    console.log(context);
    this.$el.html(_.template($('#map-view').html(), context));
    $('#map-container').show();
    
    // Create the map
    this.leaflet = L.map(this.id).setView([42.343422,-83.06488], 13);
    L.tileLayer('http://{s}.tile.cloudmade.com/4c882e9e6a18405b817166a729cd6c68/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(this.leaflet);
    var featureLayer = L.geoJson(this.map.get("geom")).addTo(this.leaflet);
    this.leaflet.fitBounds(featureLayer.getBounds());
    
  }
  
});


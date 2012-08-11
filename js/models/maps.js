LW.models.Map = Backbone.Model.extend({
  
  initialize: function(options) {
    this.url = LW.API + options.url;
  }

});


LW.collections.Maps = Backbone.Collection.extend({
  model: LW.models.Map,
  url: LW.API + "/api/map/?format=json", 
  
  initialize: function(options) {  
    _.bindAll(this, 'parse', 'queryNear', 'getPages');
  },
      
  queryNear: function(bounds) {
    // var circle = new L.Circle(latlng, 1000); // find things within 1km
    var bbox = [
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
      [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
      [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
      [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat]
    ];
    
    var geoJSONQuery = {
      "type": "Polygon",
      "coordinates": [ bbox ]
    };
        
    this.url = LW.API + '/api/map/?points__within=' + JSON.stringify(geoJSONQuery) + '&format=json';
    console.log("Query near fetch:");
    this.fetch({ 
      "failure": function(c, r) {
        console.log("Failure!");
      },
      "success": function(c, r) {
        console.log("Success!");
      }
    });
  },
  
  parse: function(response) {
    console.log("Parsing response");
    console.log(response);
    return response.objects;
  },
  
  getPages: function() {
    console.log("Getting pages on a map");
    console.log(this);
    if(this.models.length > 0){
      var pages = new LW.collections.Pages();
      console.log(this.models);
      this.models.each(function(map){
        console.log(map);
      });
    }
  }
  
});
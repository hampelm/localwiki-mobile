LW.models.Map = Backbone.Model.extend({
  
  initialize: function(options) {
    this.url = LW.API + options.url;
  }

});


LW.collections.Maps = Backbone.Collection.extend({
  model: LW.models.Map,
  url: LW.API + "/api/map/?format=json", 
  
  initialize: function(options) {  
    _.bindAll(this, 'parse', 'queryNear', 'getPageURLs');
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
  
  // Return the URLs of the pages on the map so we can link to them. 
  getPageURLs: function() {
    console.log("Getting pages on a map");
    if(this.models.length > 0){
      pageURLs = [];
      _.each(this.models, function(elt) {
        pageURLs.push(elt.get("page"));
      });
      return pageURLs;
    }
    return [];
  }
  
});
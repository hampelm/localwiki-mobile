LW.models.Version = Backbone.Model.extend({
  
  initialize: function(options) {
    this.url = LW.API + options.url;
  }

});


LW.collections.Versions = Backbone.Collection.extend({
  model: LW.models.Version,
  url: LW.API + "/api/page_version/?format=json", 
  
  initialize: function(options) {  
    _.bindAll(this, 'parse');
  },
        
  parse: function(response) {
    console.log(response);
    return response.objects;
  }
  
});
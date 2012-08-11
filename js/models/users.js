LW.models.User = Backbone.Model.extend({
  
  initialize: function(options) {
    this.url = LW.API + options.url;
  }

});


LW.collections.Users = Backbone.Collection.extend({
  model: LW.models.User,
  url: LW.API + "/api/user/?format=json", 
  
  initialize: function(options) {  
    _.bindAll(this, 'parse');
  },
        
  parse: function(response) {
    console.log(response);
    return response.objects;
  }
  
});
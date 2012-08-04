LW.models.Page = Backbone.Model.extend({
  
  initialize: function(options) {
    this.slug = options.slug;
  },
  
  url: function() {
    return LW.API + '/api/page/' + this.slug + '?format=json';
  }

});


LW.collections.Pages = Backbone.Collection.extend({
  model: LW.models.Page,
  url: LW.API + "/api/page/?format=json", 
  
  initialize: function(options) {  
    _.bindAll(this, 'parse');
    this.fetch();
  },
  
  parse: function(response) {
    console.log(response);
    return response.objects;
  }
  
});
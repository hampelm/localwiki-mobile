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
    _.bindAll(this, 'parse', 'query');
  },
  
  search_url: function(term) {
    return LW.API + '/api/page/search/?q=' + term + '&format=json';
  },
  
  query: function(query) {
    this.url = this.search_url(query.term);
    console.log(this.url);
    this.fetch();
  },
  
  parse: function(response) {
    console.log(response);
    return response.objects;
  }
  
});
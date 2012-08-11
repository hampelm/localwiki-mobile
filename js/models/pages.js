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
  
  bounds_urls: function(geoJSON) {
    // We actually need to return 3 URLs: 
    return [
      LW.API + '/api/map/?points__within='  + geoJSONString,
      LW.API + '/api/map/?points__within='  + geoJSONString,
      LW.API + '/api/map/?points__within='  + geoJSONString
    ];
  },
  
  search_url: function(term) {
    return LW.API + '/api/page/?name__icontains=' + term + '&format=json';
  },
  
  query: function(query) {
    if (query.term.length > 2) {
      this.url = this.search_url(query.term);
      console.log(this.url);
      this.fetch();
    }else {
      // If the term is too short, empty the collection & don't search
      this.reset();
    };
  },
  
  query_near: function(location) {
    var defaultBounds = '';    
  },
  
  parse: function(response) {
    console.log(response);
    return response.objects;
  }
  
});
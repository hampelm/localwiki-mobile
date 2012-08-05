LW.views.SearchView = Backbone.View.extend({
    
  initialize: function(options) {
    console.log("Initialize search view");
    _.bindAll(this, 'render', 'search');
    
    this.render();
  },
  
  events: {
    "keyup #search-input": "search"
  },
  // On search, create a PageListView. 
  // options.query.term = search term
  // options.el  = #search-results
  
  search: function(e) {
    var term = $('#search-input').attr('value');
    console.log(term);
    
    if (term.length > 2) {
      this.resultsListView.update({term: term});
      console.log(this.resultsListView);
    };
  },
  
  render: function() {  
    console.log("Rendering the search view");
    var context = {};
    this.$el.html(_.template($('#search-view').html(), context));    
      
    this.resultsListView = new LW.views.PageListView({el: $("#search-results")});
  }

});


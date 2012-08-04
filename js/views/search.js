LW.views.SearchView = Backbone.View.extend({
  
  initialize: function(options) {
    console.log("Initialize search view");
    _.bindAll(this, 'render');
    this.el = $("#search");
    this.render();
  },
  
  render: function() {  
    console.log("Rendering the search view");
    var context = {};
    this.el.html(_.template($('#search-view').html(), context));  
  }

});


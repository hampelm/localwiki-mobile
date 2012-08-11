LW.views.Home = Backbone.View.extend({
  
  el: $("#container"),
  
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.render();
  },
  
  render: function(e) {  
    console.log("Rendering home");
    
    var context = {   };
    this.$el.html(_.template($('#home').html(), context));    
    
    // Create the sub views
    this.searchView = new LW.views.SearchView({el: $("#search")});
    this.mapView = new LW.views.MapView({ el: '#near-me-map' });
    this.mapView.pagesNear();
  }
  
});


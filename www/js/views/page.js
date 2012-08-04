LW.views.PageView = Backbone.View.extend({
  
  el: $("#container"),
  
  initialize: function(options) {
    console.log("Initialize page view");
    _.bindAll(this, 'render', 'map');
    
    this.page = new LW.models.Page({slug: options.slug});
    this.page.fetch();
    this.page.on('change', this.render);
    this.page.on('change:[map]', this.map);
  },
  
  map: function() {
    this.mapView = new LW.views.MapView({
      url: this.page.get('map'),
      el: '#map-container'
    });
  },
  
  render: function() {  
    console.log("Rendering the page");
    var context = { 
      page: this.page.toJSON()
    };
    console.log(context);
    
    this.$el.html(_.template($('#page-view').html(), context));  
    
    // Fix internal links
    $(".page a:not(.external)").each(function(index) {
      var href = $(this).attr("href");
      $(this).attr("href", "#page/" + href);
    });
    
    // Render the map
    if(this.page.get('map')){
      this.map();
    };
    
    
  }
  
  
});


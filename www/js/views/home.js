LW.views.Home = Backbone.View.extend({
  
  el: $("#container"),
  
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.pages = new LW.collections.Pages();
    this.pages.on('reset', this.render);
  },
  
  render: function(e) {  
    console.log("Rendering home");
    var context = { 
      pages: this.pages.toJSON()
    };
    
    this.$el.html(_.template($('#home').html(), context));    
  }
  
});


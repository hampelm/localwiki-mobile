LW.routers.Index = Backbone.Router.extend({
  routes: {
    "": "home",
    "page/:slug": "page",
    "*actions": "default_route"
  },
  
  initialize: function(options) {
      this.controller = options.controller;
  },
  
  home: function() {
    console.log("Index");
    this.controller.goto_home();
  },
  
  page: function(id) {
    this.controller.goto_page(id);
  },
      
  default_route: function(actions) {
    console.log(actions);
  }    
});
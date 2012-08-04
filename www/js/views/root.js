LW.views.Root = Backbone.View.extend({
  /*
   * The singleton view which manages all others. Essentially, a "controller".
   *
   * A single instance of this object exists in the global namespace as 
   * "Everything".
   */
  
  el: $("#app"),
  views: {},
  _router: null,
  survey: null,
  
  initialize: function() {
    // Bind local methods
    _.bindAll(this);
    
    // Set up global router
    this._router = new LW.routers.Index({ controller: this });
    
    return this;
  },
  
  startRouting: function() {
    /*
     * Start Backbone routing. Separated from initialize() so that the
     * global controller is available for any preset routes (direct links).
     */
    Backbone.history.start();
  },
    
  getOrCreateView: function(name, options) {
    // Register each view as it is created and never create more than one.
    if (name in this.views) {
      console.log("Going to " + name);
      return this.views[name];
    }

    console.log("Creating " + name);
    this.views[name] = new LW.views[name](options);

    return this.views[name];
  },
  
  switchPage: function(page) {
    /*
     * Show the given page; hide the others
     */
    $('.page').hide();
    if (page.show !== undefined) {
      page.show();
    } else {
      page.$el.show();
    }
  },
  
  goto_home: function() {
    this.currentContentView = this.getOrCreateView("Home");
    this.currentContentView.render();
    this._router.navigate("");
  },
  
  goto_page: function(slug) {
    this.currentContentView = new LW.views.PageView({slug: slug});
    this._router.navigate("page/" + slug);
  }
  
  
});
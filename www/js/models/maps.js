LW.models.Map = Backbone.Model.extend({
  
  initialize: function(options) {
    this.url = LW.API + options.url;
  }

});

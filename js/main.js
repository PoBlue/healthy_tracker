var App = App || {};

App.selectedItem = {};
App.events = _.extend({}, Backbone.Events);

App.events.on("selectedItem:event", function (data) {
  App.selectedItem = new EatenItem(data.model.attributes);
  App.searchItemsView.clearView();
  
  App.eatenItems.add(App.selectedItem);
  App.selectedItem.save();

  App.eatenItemsView.render();
});


$(document).ready(function() {
  //initialize properties for app
  App.searchItems = new SearchItems();
  App.searchItemsView = new SearchItemsView({ model: App.searchItems });

  $("#search").append(App.searchItemsView.render().$el);
  var html = Mustache.render($('#searchTemplate').html());
  $("#search").append(html);

  App.eatenItems = new EatenItems();
  // localstorage help from: http://stackoverflow.com/questions/12606837/how-to-get-backbone-collection-from-backbone-localstorage
  App.eatenItems.localStorage = new Backbone.LocalStorage("DietApp"),
  App.eatenItems.fetch();

  App.eatenItemsView = new EatenItemsView({ model: App.eatenItems });
	App.eatenItemsView.render();
});
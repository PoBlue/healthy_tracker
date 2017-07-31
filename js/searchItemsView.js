var SearchItemsView = Backbone.View.extend({
    tagName: "div",
    attributes: {
        class: 'ud-search-input input-group'
    },

    initialize: function() {
        var template = $("#searchInputTemplate").html();
        var html = Mustache.render(template, this.model.toJSON());
        this.$el.html(html);
    },

    events: {
        "keypress #query": "onEnterPress",
        "click #searchBtn": "onClickSearch"
    },

    onClickSearch: function() {
        var self = this;

        this.model.query = $("#query").val();
        this.model.fetch({
            reset: true,
            success: function(data){
                self.render();
            },
            error: function(){
                alert("can not get data from Nutritionix..");
            }
        });
    },
    
    onEnterPress: function(e){
        if (e.keyCode == 13)
            this.onClickSearch();
    },

    clearView: function() {
        var $searchResults = $("#ud-search-items");
        $searchResults.html("");
    },

    render: function() {
        var self = this;

        var $searchResults = $("#ud-search-items");
        $searchResults.html("");

        this.model.each(function (item) {
            var view = new SearchItemView({ model: item });
            $searchResults.append(view.render().$el);
        });
        return this;
    }
});
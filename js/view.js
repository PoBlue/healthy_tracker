var EatenItemsView = Backbone.View.extend({
    el: '#list',

    totalCalories: 0,

    initialize: function() {
        var template = $("#eaten-content").html();
        var html = Mustache.render(template, this);
        this.$el.append(html);

        this.model.on("remove", this.onDeleteEatenItem, this);
    },

    onDeleteEatenItem: function (item) {
        // removes item from dom
        this.$("li#" + item.cid).remove();
        this.render();
    },

    render: function() {
        var self = this;
        self.totalCalories = 0;

        var $list = $('.eaten-items-list');
        $list.html("");

        this.model.each(function(item) {
            var view = new EatenItemView({ model: item});
            $list.append(view.render().$el);

            var itemCalories = item.attributes.nf_calories;
            self.totalCalories += itemCalories;
        });
        
        var template = $("#eaten-total-calories").html();
        var html = Mustache.render(template, self);
        $('.total-calories').html(html);

        return this;
    }
});

var EatenItemView = Backbone.View.extend({
    tagName: "li",
    initialize: function () {
        this.model.on("change", this.render, this);
    },
    
    events: {
        "click #delete": "onClickDelete"
    },

    onClickDelete: function () {
        this.model.destroy();
    },

    render: function() {
        var template = $("#eatenItemTemplate").html();
        var html = Mustache.render(template, this);
        this.$el.html(html);
        this.$el.attr("id", this.model.cid);

        return this;
    }
});

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

var SearchItemView = Backbone.View.extend({

    tagName: "li",

    attributes: {
        id: 'ud-search-item',
    },

    initialize: function () {
        this.render();
    },

    events: {
        "click": "onClickedItem"
    },

    onClickedItem: function () {
        App.events.trigger("selectedItem:event", this);
        App.searchItems.reset();
    },

    render: function () {
        var template = $("#searchItemTemplate").html();
        var html = Mustache.render(template, this.model.toJSON());
        this.$el.html(html);

        return this;
    }

});
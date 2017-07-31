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
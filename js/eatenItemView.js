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
var EatenItemsView = Backbone.View.extend({
    el: '#list',

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

        var $list = $('.eaten-items-list');
        $list.html("");

        this.model.each(function(item) {
            var view = new EatenItemView({ model: item});
            $list.append(view.render().$el);
        });

        return this;
    }
});
var EatenItem = Backbone.Model.extend({
    
});

var EatenItems = Backbone.Collection.extend({
    model: EatenItem
});

var SearchItem = Backbone.Model.extend({
    parse: function(item) {
        return item.fields;
    }
});

var SearchItems = Backbone.Collection.extend({
    model: SearchItem,
    query: $('#search').val(),

    parse: function(response){
        return _.map(response.hits, function(item){
            return item;
        });
    },

    urlBase: "https://api.nutritionix.com/v1_1/search/",
    queryConfig: "?results=0%3A20&cal_min=0&cal_max=50000&fields=*&appId=e610064a&appKey=af0b2bcc8a8432734a9b1ab69b03f416",

    url: function() {
        return this.urlBase + this.query + this.queryConfig;
    }
});
var app = {}; // create namespace for our app

app.AppView = Backbone.View.extend({
    el: '#shabbatapp',
    initialize: function() {this.render();},
    render: function(){
        this.$el.html('<p class="msg">Je ne sais pas.</p>');
        return this;
    }
});


$(function () {
    new app.AppView();
});
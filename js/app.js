// Global Backbone
var app = app || {};

$(function () {
    // Configure locale
    moment.locale('fr');

    var sh = new app.ShabbatTimeModel();
    new app.ShabbatTimeView({model: sh});
    sh.fetch();
});
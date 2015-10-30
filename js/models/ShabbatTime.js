// Global Backbone
var app = app || {};

app.ShabbatTimeModel = Backbone.Model.extend({
    defaults: {
        error: undefined,
        start: moment().add(1, "days"),
        end: moment().add(2, "days")
    }
});
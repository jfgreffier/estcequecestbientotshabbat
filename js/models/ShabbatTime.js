// Global Backbone
var app = app || {};

app.ShabbatTimeModel = Backbone.Model.extend({
    url: "https://crossorigin.me/http://api.calj.net/shabbat.json?tz=Europe/Paris&key=demo",
    //url: "http://api.calj.net/shabbat.json?tz=Europe/Paris&key=demo",
    defaults: {
        error: undefined,
        start: undefined,
        end: undefined
    },
    // TODO Override fetch with error management
    parse: function(response) {
        if (!response) {
            return {error: "no response"};
        }

        if (!response.success) {
            return {error: response.error};
        }

        return {
            // Friday night
            start: moment(response.shabbat + " " + response.knissa, "YYYY-MM-DD hh:mm").subtract(1, "days"),
            // Saturday
            end: moment(response.shabbat + " " + response.motzash, "YYYY-MM-DD hh:mm")
        };
    }
});
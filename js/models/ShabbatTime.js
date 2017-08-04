// Global Backbone
var app = app || {};

app.ShabbatTimeModel = Backbone.Model.extend({
    // url: 'https://crossorigin.me/http://api.calj.net/shabbat.json?tz=Europe/Paris&key=demo',
    // url: 'http://api.calj.net/shabbat.json?tz=Europe/Paris&key=demo',
    url: 'http://www.hebcal.com/shabbat/?cfg=json&geo=city&city=FR-Paris&m=50',
    defaults: {
        error: undefined,
        start: undefined,
        end: undefined
    },
    // TODO Override fetch with error management
    parse: function(response) {
        if (!response) {
            return {error: 'no response'};
        }

        var times = {};
        response.items.map(function(item) {
            if (item.category === 'candles') {
                // Friday night aka knissa
                times.start = moment(item.date);
            }
            else if (item.category === 'havdalah') {
                // Saturday aka motzash
                times.end = moment(item.date);
            }
        });

        return times;
    }
});
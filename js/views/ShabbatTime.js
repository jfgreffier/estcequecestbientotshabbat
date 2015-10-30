// Global Backbone
var app = app || {};

app.ShabbatTimeView = Backbone.View.extend({
    el: '#shabbatapp',
    model: new app.ShabbatTimeModel,
    initialize: function() {
        this.render();
    },
    render: function(){
        var error = this.model.get("error");
        var start = this.model.get("start");
        var end = this.model.get("end");

        // Error
        if (error) {
            this.$el.html('<p class="msg">Une erreur est survenue.</p>');
            console.error(error);
            return this;
        }

        // No result
        if (!start || !end) {
            this.$el.html('<p class="msg">Je ne sais pas encore.</p>');
            return this;
        }

        // Display result as a friendly message
        var now = moment();
        if (now.isAfter(start) && now.isBefore(end)) {
            this.$el.html('<p class="msg">Oui!</p>');
        } else if (now.isBefore(start)) {
            var diffDays = start.diff(now, "days");
            var diffHours = start.diff(now, "hours");
            // Days, hours, minutes
            if (diffDays > 0) {
                this.$el.html('<p class="msg">Dans quelques jours</p>');
            } else if (diffHours > 0) {
                this.$el.html('<p class="msg">Dans quelques heures</p>');
            } else {
                this.$el.html('<p class="msg">Très bientôt</p>');
            }
        }

        return this;
    }
});
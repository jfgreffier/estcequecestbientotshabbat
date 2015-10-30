// Global Backbone
var app = app || {};

app.ShabbatTimeView = Backbone.View.extend({
    el: '#shabbatapp',
    initialize: function() {
        this.model.on("change", this.render, this);
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
            this.$el.html('<p class="msg">Est-ce que c\'est bientôt Shabbat?</p>');
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
            if (diffDays > 1) {
                this.$el.html('<p class="msg" title="' + start.from(now) + '">Dans quelques jours</p>');
            } else if (diffHours > 1) {
                this.$el.html('<p class="msg" title="' + start.from(now) + '">Dans quelques heures</p>');
            } else {
                this.$el.html('<p class="msg" title="' + start.from(now) + '">Très bientôt</p>');
            }
        }

        return this;
    }
});
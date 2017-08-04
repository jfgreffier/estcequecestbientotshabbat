// Global Backbone
var app = app || {};

// Localized messages
var messages = {
  indays: ['Dans quelques jours', 'non.'],
  inhours: ['Dans quelques heures', 'Encore quelques heures', 'Aujourd\'hui', 'Pas encore 😞'],
  inminutes: ['Très bientôt', 'Non, mais presque', 'Presque', 'Pas tout à fait', 'Pas encore, mais on va faire comme si'],
  now: ['Oui!', 'Ca y est!', 'C\'est Shabbat!']
};

// Useful snippet
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.ShabbatTimeView = Backbone.View.extend({
    el: '#shabbatapp',
    initialize: function() {
        this.model.on('change', this.render, this);
        this.render();
    },
    randomMessage(messages) {
        return messages[getRandomInt(0, messages.length - 1)];
    },
    render: function(){
        var error = this.model.get('error');
        var start = this.model.get('start');
        var end = this.model.get('end');

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
            this.$el.html('<p class="msg">' + this.randomMessage(messages.now) + '</p>' + 
                '<img src="res/dancing.gif"></img>');
        } else if (now.isBefore(start)) {
            var diffDays = start.diff(now, 'days');
            var diffHours = start.diff(now, 'hours');

            // Days, hours, minutes
            if (diffDays > 1) {
                this.$el.html('<p class="msg" title="' + start.from(now) + '">' + this.randomMessage(messages.indays) + '</p>');
            } else if (diffHours > 1) {
                this.$el.html(
                    '<p class="msg" title="' + start.from(now) + '">' + this.randomMessage(messages.inhours) + '</p>');
            } else {
                this.$el.html('<p class="msg" title="' + start.from(now) + '">' + this.randomMessage(messages.inminutes) + '</p>');
            }
        }

        return this;
    }
});
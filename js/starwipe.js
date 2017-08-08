var bep = bep ? bep : {};
(function($) {
    $.extend(bep, {
        starwipe: {
			starwipeSelector: '.starwipe',

            init: function() {
                var self = this;
                
                $(self.starwipeSelector).click(function(event) {
                    $.starwipe($(event.target).attr('href'));
                    event.preventDefault();
                });

            }
        }
    });
    $.subscribe('pageReady', function() {
        bep.starwipe.init();
    });
}(jQuery));

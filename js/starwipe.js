var bep = bep ? bep : {};
(function($) {
    $.extend(bep, {
        starwipe: {
			starwipeSelector: '.starwipe',

            init: function() {
                var self = this;
                
                $(self.starwipeSelector).click(function(event) {
                    event.preventDefault();
                    $.starwipe($(event.target).attr('href'));
                });

            }
        }
    });
    $.subscribe('pageReady', function() {
        bep.starwipe.init();
    });
}(jQuery));

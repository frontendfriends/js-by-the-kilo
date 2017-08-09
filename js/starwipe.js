var bep = bep ? bep : {};
(function($) {
    $.extend(bep, {
        starwipe: {
			starwipeSelector: '.js-starwipe-trigger',

            init: function() {
                var self = this;
                
                $(self.starwipeSelector).click(function(event) {
                    var url = $(event.target).attr('href');

                    if ( !$.starwipe( url ) ) {
                        return;
                    }

                    event.preventDefault();
                });

            }
        }
    });
    $.subscribe('pageReady', function() {
        bep.starwipe.init();
    });
}(jQuery));

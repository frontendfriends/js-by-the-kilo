var bep = bep ? bep : {};
(function($) {
    $.extend(bep, {
        carousel: {
			// jQuery DOM caching
			$carousels: null,
			// CSS selectors
			carouselSelector: '.carousel',
			// Classes
			// Misc

            init: function() {
                var self = this;

                self.$carousels = $(self.carouselSelector);

                if (!self.$carousels.length) {
                    return;
                }

                self.$carousels.each(function() {
                    var $carousel = $(this);

                    var options = {
                        accessibility: true,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        arrows: true,
                        pauseOnHover: false,
                        prevArrow: '<button type="button" class="carousel__arrow carousel__prev"><i class="fa fa-chevron-left" aria-hidden="true"></i><span>Previous</span></button>',
                        nextArrow: '<button type="button" class="carousel__arrow carousel__next"><i class="fa fa-chevron-right" aria-hidden="true"></i><span>Next</span></button>'
                    };

                    $carousel.slick(options);
                });
            }
        }
    });
    $.subscribe('pageReady', function() {
        bep.carousel.init();
    });
}(jQuery));

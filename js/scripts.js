var bb = bb ? bb : {};
(function($) {
	/**
	 * Publish events using Pub/Sub
	 * @namespace events
	 * @see {@link https://github.com/cowboy/jquery-tiny-pubsub}
	 */
	$.extend(bb, {
		/**
		 * Publish event when the page is ready.
		 * @function pageReady
		 */
		pageReady: function() {
			var self = this;

			$.publish('pageReady_prioritise', self);
			$.publish('pageReady', self);

			self.pageLoaded();
		},
		/**
		 * Publish event when the page has loaded.
		 * @function pageLoaded
		 */
		pageLoaded: function() {
			var self = this;

			self.settings.$window.on('load', function() {

				$.publish('pageLoaded', self);
			});
		},
		/**
		 * Publish event when an AJAX request has finished.
		 * @function ajaxLoaded
		 */
		ajaxLoaded: function() {
			var self = this;

			$.publish('ajaxLoaded', self);
		}
	});
}(jQuery));

var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		settings: {
			// cache some common variables
			$window: $(window),
			$html: $('html'),
			$body: $('body'),
			$htmlbody: $('html,body')
		}
	});
}(jQuery));

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

var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		monitorMq: {
			// jQuery DOM caching
			$detector: null,
			// CSS selectors
			detectorClass: 'monitor-mq',
			detectorId: 'monitor_mq',
			// Configuration
			detectorWidth: 0,
			currentBreakpoint: 0,
			previousBreakpoint: 0,
			
			init: function() {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitor();
			},
			monitor: function() {
				var self = this;
				if (!self.$detector.length) {
					self.$detector = $('<div />', {
						id: self.detectorId,
						class: self.detectorClass
					});
					bb.settings.$body.append(self.$detector);
				}
				self.detectorWidth = self.$detector.width();
				if (self.detectorWidth !== self.currentBreakpoint) {
					self.previousBreakpoint = self.currentBreakpoint;
					self.currentBreakpoint = self.detectorWidth;
				}
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.monitorMq.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.monitorMq.monitor();
	});
}(jQuery));

var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		pageReadyClass: function() {
			var self = this;

			self.settings.$html.addClass('page-ready');
		},
		pageLoadedClass: function() {
			var self = this;

			self.settings.$html.addClass('page-loaded');
		}
	});
	$.subscribe('pageReady', function() {
		bb.pageReadyClass();
	});
	$.subscribe('pageLoaded', function() {
		bb.pageLoadedClass();
	});
}(jQuery));

var bep = bep ? bep : {};
(function($) {
    $.extend(bep, {
        starwipe: {
			starwipeSelector: '.starwipe',

            init: function() {
                var self = this;

                if ( !jQuery.starwipe( url ) ) {
                    return;
                }
                
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

/**
 * @file Viewport Resize
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Reusable site resize function.
		 * @namespace viewportResize
		 */
		viewportResize: {
			// Configuration
			resizeTimeout: null,
			timeoutDuration: 200,
			/**
			 * Initialises viewport resize module, binds event to window resize.
			 * @function init
			 * @memberOf viewportResize
			 */
			init: function() {
				var self = this;

				bb.settings.$window.on('resize.viewportResize', function() {
					if (self.resizeTimeout) {
						clearTimeout(self.resizeTimeout);
					}

					$.publish('viewportResizeStart');

					self.resizeTimeout = setTimeout(function() {
						$.publish('viewportResizeEnd_prioritise');
						$.publish('viewportResizeEnd');
					}, self.timeoutDuration);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.viewportResize.init();
	});
}(jQuery));

$(function(){
  var init = (bb !== undefined) ? bb.pageReady() : null;
});

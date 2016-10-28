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

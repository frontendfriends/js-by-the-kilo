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

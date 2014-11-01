// write JavaScript here


$(document).ready(function() {
	
	$.fn.scrollStopped = function(callback) {
		$(this).scroll(function(){
			var self = this, $this = $(self);
			if ($this.data('scrollTimeout')) {
				clearTimeout($this.data('scrollTimeout'));
			}
			$this.data('scrollTimeout', setTimeout(callback,250,self));
		});
    };

    // This is the timer that will be
    // used to have the menus fade out.
    // This can be cleared by some other
    // input. See below.
    var fadeOutTimeout;

    // Menus animate out on start.
    fadeMenuOut();

    // Menus fade in when scrolling.
    $(window).scroll(function() {
		fadeMenuIn();
    });

    // Menus fade out when you stop scrolling.
	$(window).scrollStopped(function(){
		fadeMenuOut();
	});

	// Hovering over a menu clears the
	// interval that is being waited on
	// for the fadeMenuOut to happen.
	$(".menu-button").mouseenter(function () {
		$(".menu-button").stop();
		if (fadeOutTimeout) {
			clearInterval(fadeOutTimeout);
		}
	});

	// Unhovering a menu reinitializes the
	// fade out timer.
	$(".menu-button").mouseleave(function () {
		fadeMenuOut();
	});

	function fadeMenuOut () {
		$(".menu-button").stop();
		fadeOutTimeout = setTimeout(function () {
			$(".menu-button").fadeOut(500);
		}, 2000);
	}

	function fadeMenuIn () {
		$(".menu-button").stop().fadeIn(50);
	}
});






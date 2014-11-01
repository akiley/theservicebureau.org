(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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






},{}]},{},[1])
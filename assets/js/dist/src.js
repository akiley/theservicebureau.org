(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// write JavaScript here

console.log($('p').text());


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



	$(function () {
		$(".menu-button").delay(2000).fadeOut(500);
	});

	$(window).scrollStopped(function(){
	    $(".menu-button").stop().delay(2000).fadeOut(500);
	});                   

	$(window).scroll(function() {
		$(".menu-button").stop().fadeIn(50);
	});





	$("#store-button").hover(function(){
  		$(this).animate({height:"150", width:"150", marginLeft:"-25", marginTop:"-75"}, 50);
  		},
		function(){
  		$(this).animate({height:"100", width:"100", marginLeft:"0", marginTop:"-50"}, 50);
	});



	





});






},{}]},{},[1])
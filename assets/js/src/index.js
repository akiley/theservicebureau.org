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






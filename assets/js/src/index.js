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

    // Layout image piles.
    layoutImagePiles();

    // Setup the menu interaction.
    setupMenuInteraction();

    function layoutImagePiles () {
        var piles = {};
        var randomOffset = function () {
            var maxRandomOffset = 30;
            var offsetInterval = 10;
            var r = Math.random() * maxRandomOffset;
            var i = Math.floor(r/offsetInterval);
            if (Math.random() > 0.3) {
                Math.ceil(r/10);
            }
            if (Math.random() > 0.5) {
                i *= -1;
            }
            return i * offsetInterval;
        };
        /*
        Need to know the height and
        width of each image to determine
        its random offset. To do so, we
        need a reference to the original
        loaded image. */
        $("img").load(function () {
            var img = $(this);
            var parent = img.parent();
            var grandParent = parent.parent();

            /* 
            We are only interested in randomly
            offsetting images that are in a .images
            parent, and .post grandparent. */
            if (grandParent.hasClass('post')) {
                var pileMaxHeight = parent.height();
                var pileMaxWidth = parent.width();

                /*
                Make an id for the grandparent
                based on the classes it has.
                Each post should be a different
                project, with a different name.
                So these should be unique. */
                var pileId = grandParent.attr('class')
                    .replace(/ /g, '--');

                /*
                If this is the first image in
                a pile, make an array to store
                a reference to all of the images
                in the pile, to determine their
                offsets. */
                if (!(pileId in piles)) {
                    piles[pileId] = [];
                    first = true;
                }

                var height = img.height();
                var width = img.width();

                var placement = placeImage();

                function placeImage () {
                    return {
                        left: ((pileMaxWidth - width)/2) +
                              randomOffset(),
                        top: ((pileMaxHeight - height)/2) +
                              randomOffset()
                    };
                }

                /*
                Ensure images are not cover
                the same area in a pile. */
                ensureNoOverlap();

                function ensureNoOverlap () {
                    piles[pileId].forEach(function (i) {
                        if ((placement.top === i.top) &
                            (placement.left === i.left)) {
                            placement = placeImage();
                            ensureNoOverlap();
                        }
                    });
                }

                img.css('top', placement.top);
                img.css('left', placement.left);

                var i = placement;
                i.img = img;

                piles[pileId].push(i);
            }
        });
    }

    function setupMenuInteraction () {
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
                clearTimeout(fadeOutTimeout);
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
    }
});

// write JavaScript here
DEBUG = true;

function debug(str) {
    if (DEBUG) {
        console.log(str);
    }
}


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
    setupMenuInteraction(Modernizr.touch);

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

    function setupMenuInteraction (touchBool) {
        var menu = $('.menu-button');
        // Is the menu showing? Keep track
        // so you don't continually try to show
        // it when its shown, or conversely,
        // continually hide it when its already
        // in a hidden state.
        var menuIn = true;

        if (touchBool) {
            /* Browser supports touch, hook into
               document.body touch events. */
            
            setupTouchMenuInteraction();
            
        } else {
            /* No touch events, hook into the
               window scroll event.*/

            setupScrollMenuInteraction();
        }

        function setupTouchMenuInteraction () {
            debug("Touch is the input to watch.");

            var recognizers = [
                [ Hammer.Pan,
                  { direction: Hammer.DIRECTION_ALL } ]
            ];
            var toucher = new Hammer(
                document.body,
                { touchAction: 'pan',
                  preset: recognizers }
            );

            toucher.on('panup', function (ev) {
                debug('Detected panup');
                fadeMenuOut();
            });

            toucher.on('pandown', function (ev) {
                debug('Detected pandown');
                fadeMenuIn();
            });
        }

        function setupScrollMenuInteraction () {
            debug("Scrolling is the input to watch.");

            // Track previous position in order
            // to determine direction of scrolling.
            var previousScrollPosition = 0;


            var update = function() {
                // Current scroll position minus
                // the previous scroll position
                // will tell us whether the user
                // is moving up or down the page.
                var deltaY = document.body.scrollTop - previousScrollPosition;

                if (deltaY < 0) {
                    debug('Scrolling up.');
                    fadeMenuIn();
                } else {
                    debug('Scrolling down.');
                    fadeMenuOut();
                }

                // Update the previous scroll
                // position to the current value.
                previousScrollPosition = document.body.scrollTop;
            };

            
            // Run the update function when scrolled.
            $(window).scroll(update);
        }

        function fadeMenuOut () {
            if (menuIn) {
                menu.stop().fadeOut(80);
                menuIn = false;
            }
        }

        function fadeMenuIn () {
            if (!menuIn) {
                menu.stop().fadeIn(80);
                menuIn = true;
            }
        }
    }
});

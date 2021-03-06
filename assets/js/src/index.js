// write JavaScript here
DEBUG = true;

function debug(str) {
    if (DEBUG) {
        console.log(str);
    }
}


$(document).ready(function() {

    // Setup the menu interaction.
    setupMenuInteraction(Modernizr.touch);

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
                if (withinBuffer()) {
                    debug('Within Top Page Buffer.');
                    fadeMenuIn();
                } else {
                    fadeMenuOut();
                }
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

                if (withinBuffer()) {
                    debug('Within Top Page Buffer.');
                    fadeMenuIn();
                } else {
                    if (deltaY < 0) {
                        debug('Scrolling up.');
                        fadeMenuIn();
                    } else {
                        debug('Scrolling down.');
                        fadeMenuOut();
                    }
                }

                // Update the previous scroll
                // position to the current value.
                previousScrollPosition = document.body.scrollTop;
            };

            
            // Run the update function when scrolled.
            $(window).scroll(update);
        }

        function withinBuffer () {
            /* Returns boolean.
               If inside the buffer, true.
               if not, false. */

            // Defines the number of pixels from
            // the top where the menu always shows.
            var pageTopBuffer = 100;

            return window.scrollY < pageTopBuffer;
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

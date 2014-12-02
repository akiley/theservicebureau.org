// Modernizr 2.8.3 (Custom Build) | MIT & BSD
// Build: http://modernizr.com/download/#-touch-cssclasses-teststyles-prefixes
// Used to test for touch support in the browser.
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document);

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
        // Selector that we are operating on.
        var menu = $('.menu-button');

        /* Is the menu showing? Keep track
           so you don't continually try to show
           it when its shown, or conversely,
           continually hide it when its already
           in a hidden state. */
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
            var pageTopBuffer = 200;

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

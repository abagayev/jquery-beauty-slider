/*
        Slide Beauty Box v0.9 - another jQuery plugin
        By Anton Bagayev / Don't give a fish (www.dontgiveafish.com)
        Сode based on imageLens http://www.dailycoding.com/ 
*/

(function ($) {
    
    if(!$.omr){ $.omr = new Object(); }
       
    $.omr.beautyslider = function(el, options) {

            var base = this;

            // Access to jQuery and DOM versions of element
            base.$el = $(el);
            base.el = el;

            // Add a reverse reference to the DOM object
            base.$el.data("omr.beautyslide", base);

            // load options
            base.options = $.extend({},$.omr.beautyslider.defaultOptions, options);
            el.data('options.currentSlide', base.options.currentSlide);
            el.data('options.slidesTota.', base.options.slidesTotal);
            el.data('options.onChange', base.options.onChange);
            el.data('options.sliderCSS', base.options.sliderCSS);
            el.data('mousedown', false);

            // add class
            el.addClass(el.data('options.sliderCSS'));

            // add traveller
            el.data('traveller', $('<div class="traveller"></div>').appendTo(base.el));

            // add events to slider, traveller and document

            $(base.el).mousedown(function(e) { // move on mousedown
                  $(this).data('mousedown', true).addClass('active');
                  var relX = e.pageX - $(this).offset().left;

                  movemovemove(relX);
            });
            $(document).mousemove(function(e) { // move on mousemove
                  if (!el.data('mousedown')) return false;
                  var relX = e.pageX - el.offset().left;

                  movemovemove(relX);
            });
            $(document).mouseup(function(e) {  // don't move on mouseup
                  el.data('mousedown', false).removeClass('active');
            });


            // start from currentSlide
            var range = el.width()/options.slidesTotal>>0;
            movemovemove(range*(el.data('options.currentSlide')-1));

            // move traveller width mouse
            function movemovemove(relX) {

                var traveller = el.data('traveller');
                var max = el.width();
                var range = max/options.slidesTotal>>0;
                var frame = 1+relX/range>>0;

                if (el.data('currentSlide') == frame) return;

                // setting up new frame

                if (frame <= 1) {
                    traveller.css('left', '0px');
                    frame = 1;
                }
                else if (frame >= options.slidesTotal) {
                    traveller.css('left', (max-traveller.width())+'px');
                    frame = options.slidesTotal;
                }
                else {
                    traveller.css('left', ((frame-1)*range*(1+1/options.slidesTotal))>>0+'px');
                }

                // remember current slide
                el.data('currentSlide', frame);
                $(this).data('currentSlide', frame);

                // call user function onChange
                if (el.data('options.onChange')) el.data('options.onChange').call();

            }

    };

    $.fn.getCurrentSlide = function() {
        return $(this).data('currentSlide');
    };

    $.omr.beautyslider.defaultOptions = {
            currentSlide:   1,
            slidesTotal:    7,
            sliderCSS:      'beautyslider',
            onChange:       null
    };

    $.fn.beautyslider = function(options) {
        return this.each(function(){
            ($.omr.beautyslider($(this), options));
        });
    };

})(jQuery);
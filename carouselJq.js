/*
 Author: Michael Sive

 Description:
 ============
 A very simple jQuery carousel.
 ========
 Usage:
 ========
  $('#myElement').carousel(options);
 ========
 Notes:
 ========
  Can be used on multiple elements using a class selector.
  Must have an element with class 'slides', and children elements of class 'slide'.
 ========
 Options:
 ========
  Options should be a hash. Currently the only supported options is 'btns' which adds circular buttons.
*/

// Adds the plugin to the jQuery selector
$(document).ready(function(){
  $.fn.carousel = function(options) {
    this.each(function(){
      c = new Carousel(this, options);
    });
  }
});

// Creates the javascript object
var Carousel = function(elem, options){
  // wraps the element into jQuery
  this.$carousel = $(elem);
  // sets up the styling/buttons
  this.setup(options);
}

// Sets up the required styles on the element and slide elements
Carousel.prototype.setup = function(options){
  $carousel = this.$carousel;

  // Adds buttons to the carousel if set in options
  if (options != undefined && options.btns == true){
    this.addBtns();
  }

  // Find the number of slides
  $slides = $carousel.find('.slides');
  max = $slides.find('.slide').length;

  // set the container to equal 100% of the parents times the number of slides
  slidesWidth = max * 100;
  $slides.css('position', 'relative');
  $slides.css('width', slidesWidth + '%');

  // sets the width of the slide elements
  $slides.children('img').each(function(){
    $images = $(this);
    imgWidth = (100/max);
    $images.css('width', imgWidth + '%');
    $images.css('float', 'left');
  });
}

// A function to go to the specified slide
Carousel.prototype.goToSlide = function(slideNum){
  $carousel = this.$carousel;

  // Convert the slide number to a zero-indexed position
  newPos = slideNum - 1;

  // Calculate the width of each slide
  widthOfSlide = $carousel.find('.slide').first().width();

  // Calculate the new left position value for the container
  leftPix = newPos * widthOfSlide;
  left = "-" + leftPix + "px";

  // Set the new position
  $carousel.data('position', newPos);
  $carousel.find('.slides').animate({
    'left': left,
  }, 500);
}

// A function to go to the next slide
Carousel.prototype.nextSlide = function(){
  $carousel = this.$carousel;
  pos = $carousel.data('position');
  slideNum = pos + 1;
  numSlides = $carousel.find('.slide').length;

  // If carousel is before the end, go to the next slide
  if (pos < (numSlides - 1)){
    newPos = pos + 1;
    newSlideNum = slideNum + 1;
  }
  // Else go to the beginning
  else {
    newPos = 0;
    newSlideNum = 1;
  }
  this.goToSlide(newSlideNum);
}

// An function to add the button elements to the carousel
Carousel.prototype.addBtns = function(){
  $carousel = this.$carousel;
  $slides = $carousel.find('.slides');
  $numSlides = $slides.find('.slide').length;
  slideBtns = "<div class='slide-btns'>";

  // Check to make sure there are more than one slide
  if ($numSlides > 1){
    // Add the html for the buttons
    for (var i = 0; i < $numSlides; i++){
      slideBtns += "<div data-position='" + i + "' class='slide-btn";
      if (i == 0){
        slideBtns += " active";
      }
      slideBtns += "'></div>";
    }
    slideBtns += "</div>";
    $carousel.append(slideBtns);
    $slideBtns = $carousel.find('.slide-btn');

    // Add click handlers for the buttons
    var outerThis = this;
    $slideBtns.click(function(){
      $btn = $(this);
      $siblings = $btn.siblings('.slide-btn');
      $siblings.removeClass('active');
      $btn.addClass('active');
      newSlideNum = $btn.data('position') + 1;
      outerThis.goToSlide(newSlideNum);
    });
  }
}

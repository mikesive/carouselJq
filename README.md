# carouselJq
A simple jQuery carousel.
# Usage
To initialize a carousel, use:

$('#myElement').carousel(options);
# Notes
Can be used on multiple elements using a class selector.
Must have an element with class 'slides', and children elements of class 'slide'.
# Options
Options should be a hash. Currently the only supported options are:

 - 'btns' which adds circular buttons.
 - 'autoplay' which should be a number in milliseconds.

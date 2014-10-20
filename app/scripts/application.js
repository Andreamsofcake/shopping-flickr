'use strict';

var ShoppingFlickr = Ember.Application.create();


// expose ShoppingFlickr globally
window.ShoppingFlickr = ShoppingFlickr;

ShoppingFlickr.Router.map(function(){
  // we don't need a path if the place it is going
  // is the same as the string name (aka url path)
  this.route('cart')
});


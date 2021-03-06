'use strict';

var ShoppingFlickr = Ember.Application.create();


// expose ShoppingFlickr globally
window.ShoppingFlickr = ShoppingFlickr;

ShoppingFlickr.Router.map(function(){
  // we don't need a path if the place it is going
  // is the same as the string name (aka url path)
  this.route('cart');
  this.route('photos', { path: '/' });
  this.route('photo', {path:'/:title'});
});

ShoppingFlickr.PhotosRoute = Ember.Route.extend({
  model: function () {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=98a80bf27f25bb1381e9bea26b6282e5&per_page=500&format=json&nojsoncallback=1';
    return Ember.$.ajax(url)
    .then(function(data) {
      return data.photos.photo.map(function(photo) {
        var title = photo.title;
        var photoURL = 'https://farm' +
          photo.farm + '.staticflickr.com/' +
          photo.server + '/' +
          photo.id + '_' +
          photo.secret + '.jpg';
        return {
          id: photo.id,
          photoURL: photoURL,
          title: title
        };
      });
    });
  }
});

ShoppingFlickr.PhotosController = Ember.ArrayController.extend({
  needs: ['cart'],
  cart: Ember.computed.alias('controllers.cart'),

  actions: {
    addPhotoToCart: function(photo) {
      // var cartController = this.get('cart');
      // cartController.get('model').pushObject(photo);
      ShoppingFlickr.CART_FIXTURES.pushObject(photo);
    }
  }
});

ShoppingFlickr.CART_FIXTURES = [];
ShoppingFlickr.CartRoute = Ember.Route.extend({
  model: function() {
    // console.log('getting model');
    return ShoppingFlickr.CART_FIXTURES;
  }
});

ShoppingFlickr.CartController = Ember.ArrayController.extend({
});


// ShoppingFlickr.PhotoRoute = Ember.Route.extend({
//   model: function(params) {
//      return ShoppingFlicker.Photos.findby('title', params.title)
//   }
// });

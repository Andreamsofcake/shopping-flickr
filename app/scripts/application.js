'use strict';

var ShoppingFlickr = Ember.Application.create();


// expose ShoppingFlickr globally
window.ShoppingFlickr = ShoppingFlickr;

ShoppingFlickr.Router.map(function(){
  // we don't need a path if the place it is going
  // is the same as the string name (aka url path)
  this.route('cart');
  this.route('photos', { path: '/' });
});

ShoppingFlickr.PhotosRoute = Ember.Route.extend({
  model: function () {
    var url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=98a80bf27f25bb1381e9bea26b6282e5&per_page=500&format=json&nojsoncallback=1";
    // look at steve's code to figure out ajax call & parsing/transforming the data so we return an array of
    // objects that each have a photoURL property
    return Ember.$.ajax(url)
    .then(function(data) {
      return data.photos.photo.map(function(photo) {
        var photoURL = 'https://farm' +
          photo.farm + '.staticflickr.com/' +
          photo.server + '/' +
          photo.id + '_' +
          photo.secret + '.jpg';

        return {
          photoURL: photoURL
        };
      });
    });
  }
});

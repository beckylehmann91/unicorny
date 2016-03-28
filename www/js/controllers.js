angular.module('starter.controllers', [])

.controller('UnicornsCtrl', function($scope, $http, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  var apiData = {
    apiUrl: "http://api.giphy.com/v1/gifs/search?&q=",
    searchParam: "unicorn",
    apiKey: "&api_key=dc6zaTOxFJmzC",
    limitString: "&limit=",
    limit: ""
  };

  $scope.zoomMin = 1;

  $scope.setData = function() {

    $scope.images = []
    apiData.limit = $scope.search.limit

    $http.get(apiData.apiUrl + apiData.searchParam + apiData.limitString + apiData.limit + apiData.apiKey)
        .success(function(giphy) {
          for (var i = 0; i < giphy.data.length; i++) {
          $scope.images.push({id: i, src: giphy.data[i].images.original.url})
            $scope.search.limit = ''
          }
        })
        .error(function(data) {
            alert("ERROR");
        });
  }

  $scope.showImages = function(index) {
      $scope.activeSlide = index;
      $scope.showModal('templates/image-detail.html');
    };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };

})

.controller('TrendingCtrl', function($scope, $http, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {


  $scope.images = []
  $scope.zoomMin = 1;

  $http.get("http://api.giphy.com/v1/gifs/trending?&limit=50&api_key=dc6zaTOxFJmzC")
      .success(function(giphy) {
        for (var i = 0; i < giphy.data.length; i++) {
          $scope.images.push({id: i, src: giphy.data[i].images.original.url})
        }
      })
      .error(function(data) {
          alert("ERROR");
      });

  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.showModal('templates/image-detail.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };

})

.controller('SearchCtrl', function($scope, $http, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  var apiData = {
    apiUrl: "http://api.giphy.com/v1/gifs/search?&q=",
    searchParam: "",
    apiKey: "&api_key=dc6zaTOxFJmzC",
    limitString: "&limit=",
    limit: ""
  };

  $scope.zoomMin = 1;
  $scope.search = {};

  $scope.setData = function() {

    // For searches with multiple terms, we must
    // separate each term with a '+' (ex. ryan+gosling)

    var rawSearch = $scope.search.searchParam
    var searchArray = rawSearch.split(" ")
    var searchString = ""
    for (var i = 0; i < searchArray.length; i++) {
      searchString += (searchArray[i] + "+")
    }

    apiData.searchParam = searchString
    apiData.limit = $scope.search.limit
    $scope.images = [];

    $http.get(apiData.apiUrl + apiData.searchParam + apiData.limitString + apiData.limit + apiData.apiKey)
        .success(function(giphy) {
          for (var i = 0; i < giphy.data.length; i++) {
            $scope.images.push({id: i, src: giphy.data[i].images.original.url})
            $scope.search.searchParam = ''
            $scope.search.limit = ''
          }
        })
        .error(function(data) {
            alert("ERROR");
        });
  }

  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.showModal('templates/image-detail.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };

  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };
});

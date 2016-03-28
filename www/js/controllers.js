angular.module('starter.controllers', [])

.controller('UnicornsCtrl', function($scope, $http, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

    $scope.zoomMin = 1;

    var apiData = {
      apiUrl: "http://api.giphy.com/v1/gifs/search?&q=",
      searchParam: "unicorn",
      apiKey: "&api_key=dc6zaTOxFJmzC",
      limitString: "&limit=",
      limit: ""
    };

  $scope.setData = function() {

    var imagesArray = []
    apiData.limit = $scope.search.limit

    $http.get(apiData.apiUrl + apiData.searchParam + apiData.limitString + apiData.limit + apiData.apiKey)
        .success(function(giphy) {
          for (var i = 0; i < giphy.data.length; i++) {
            imagesArray.push({id: i, src: giphy.data[i].images.original.url})
            $scope.images = imagesArray
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

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('TrendingCtrl', function($scope, $http, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  $scope.zoomMin = 1;

  var imagesArray = []
  $http.get("http://api.giphy.com/v1/gifs/trending?&limit=50&api_key=dc6zaTOxFJmzC")
      .success(function(giphy) {
        for (var i = 0; i < giphy.data.length; i++) {
          imagesArray.push({id: i, src: giphy.data[i].images.original.url})
          $scope.images = imagesArray
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

  $scope.zoomMin = 1;

  var apiData = {
    apiUrl: "http://api.giphy.com/v1/gifs/search?&q=",
    searchParam: "",
    apiKey: "&api_key=dc6zaTOxFJmzC",
    limitString: "&limit=",
    limit: ""
  };

  $scope.search = {};

  $scope.setData = function() {
    var rawSearch = $scope.search.searchParam
    var searchArray = rawSearch.split(" ")
    var searchString = ""
    for (var i = 0; i < searchArray.length; i++) {
      searchString += (searchArray[i] + "+")
    }

    apiData.searchParam = searchString
    apiData.limit = $scope.search.limit
    var imagesArray = [];

    $http.get(apiData.apiUrl + apiData.searchParam + apiData.limitString + apiData.limit + apiData.apiKey)
        .success(function(giphy) {
          for (var i = 0; i < giphy.data.length; i++) {
            imagesArray.push({id: i, src: giphy.data[i].images.original.url})
            $scope.images = imagesArray
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

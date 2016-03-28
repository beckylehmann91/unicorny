angular.module('starter.controllers', [])

.controller('UnicornsCtrl', function($scope, $http) {

    var apiData = {
      apiUrl: "http://api.giphy.com/v1/gifs/search?&q=",
      searchParam: "unicorn",
      apiKey: "&api_key=dc6zaTOxFJmzC",
      limitString: "&limit=",
      limit: ""
    };

  $scope.setData = function() {

    var urlArray = []
    apiData.limit = $scope.search.limit

    $http.get(apiData.apiUrl + apiData.searchParam + apiData.limitString + apiData.limit + apiData.apiKey)
        .success(function(giphy) {
          for (var i = 0; i < giphy.data.length; i++) {
            urlArray.push(giphy.data[i].images.original.url)
            $scope.urls = urlArray
            $scope.search.limit = ''
          }
        })
        .error(function(data) {
            alert("ERROR");
        });
  }
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

.controller('TrendingCtrl', function($scope, $http) {

  var urlArray = []
  $http.get("http://api.giphy.com/v1/gifs/trending?&limit=50&api_key=dc6zaTOxFJmzC")
      .success(function(giphy) {
        for (var i = 0; i < giphy.data.length; i++) {
          urlArray.push(giphy.data[i].images.original.url)
          $scope.urls = urlArray
        }
      })
      .error(function(data) {
          alert("ERROR");
      });
})

.controller('SearchCtrl', function($scope, $http) {

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
    var urlArray = [];

    $http.get(apiData.apiUrl + apiData.searchParam + apiData.limitString + apiData.limit + apiData.apiKey)
        .success(function(giphy) {
          for (var i = 0; i < giphy.data.length; i++) {
            urlArray.push(giphy.data[i].images.original.url)
            $scope.urls = urlArray
            $scope.search.searchParam = ''
            $scope.search.limit = ''
          }
        })
        .error(function(data) {
            alert("ERROR");
        });
  }
});

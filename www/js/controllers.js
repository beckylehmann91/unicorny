angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

    var urlArray = []
    var searchParam = "unicorn"
    $http.get("http://api.giphy.com/v1/gifs/search?&q=" + searchParam + "&api_key=dc6zaTOxFJmzC")
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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {

  var urlArray = [];
  var apiData = {
    apiUrl: "http://api.giphy.com/v1/gifs/search?&q=",
    searchParam: "",
    apiKey: "&api_key=dc6zaTOxFJmzC"
  };
  $scope.search = apiData

  $scope.completeSearch = function() {
    apiData.searchParam = $scope.search
    // $scope.search = ''
  }

  $http.get(apiData.apiUrl + apiData.searchParam + apiData.apiKey)
      .success(function(giphy) {
        for (var i = 0; i < giphy.data.length; i++) {
          urlArray.push(giphy.data[i].images.original.url)
          $scope.urls = urlArray
        }
      })
      .error(function(data) {
          alert("ERROR");
      });
});

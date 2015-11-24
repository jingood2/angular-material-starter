(function(){
  "use strict";
  /**
  * MainCtrl Module
  *
  * Description
  */
  angular
      .module('app.module.core')
      .config(function($mdThemingProvider){

        var customBlueMap =    $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });

        $mdThemingProvider.definePalette('customBlue', customBlueMap);

        $mdThemingProvider.theme('default')
          .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
          })
          .accentPalette('pink');

        $mdThemingProvider.theme('input', 'default')
              .primaryPalette('grey')  



      })
      .config(function($stateProvider, $urlRouterProvider){
          $urlRouterProvider.otherwise('/app');

          $stateProvider
          .state('app',{
                url: "/app",
                templateUrl: "./modules/core/views/main.html",
                controller: "MainCtrl"
          });
      })
      .controller('MainCtrl', ['$scope','$mdSidenav', function($scope,$mdSidenav){

          /**
           * First hide the bottomsheet IF visible, then
           * hide or Show the 'left' sideNav area
           */
          function toggleUsersList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function(){
              $mdSidenav('left').toggle();
            });
          }

      }]);
})();
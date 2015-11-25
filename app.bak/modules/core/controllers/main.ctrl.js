(function(){

  "use strict";
  /**
  * MainCtrl Module
  *
  * Description
  */
  angular
      .module('app.module.core')
      .config(function($mdThemingProvider,$mdIconProvider){

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
              .primaryPalette('grey');

       
      })
      .config(function($stateProvider, $urlRouterProvider){
          $urlRouterProvider.otherwise('/app');

          $stateProvider
          .state('app',{
                abstract: true,
                url: "/app",
                templateUrl: "./modules/core/views/main.html",
                controller: "MainCtrl"
          })
          .state('app.home',{
                url: "",
                templateUrl: "./modules/core/views/home.html",
                controller: "HomeCtrl"
          });
      })
      .controller('MainCtrl',  function($scope,$mdSidenav,$timeout, $mdBottomSheet, $mdToast){

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

        $scope.showSearch = false;

        $scope.alert = '';  

        $scope.showGridBottomSheet = function($event){
          $scope.alert = '';  

          $mdBottomSheet.show({
            templateUrl: 'modules/core/views/partials/bottom-sheet-grid-template.html',
            controller: 'GridBottomSheetCtrl',
            clickOutsideToColose: false,
            targetEvent: $event
          }).then(function(clickedItem){
            $mdToast.show(
              $mdToast.simple()
                .content(clickedItem.name + ' clicked!')
                .position('top right')
                .hideDelay(1500)
            );
          });
        };

        $scope.showListBottomSheet = function($event) {
          console.log('Clicked ShowListBottomSheet');
          $scope.alert = '';
          $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
          }).then(function(clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
          });
        };

        $scope.showAdd = function($event) {
          $mdDialog.show({
            controller: DialogController,
            template: '<md-dialog aria-label="User Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: $event,
          })
          .then(function(answer) {
            $scope.alert = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.alert = 'You cancelled the dialog.';
          });
        };

      });
      /*
      .controller('GridBottomSheetCtrl',function($scope, $mdBottomSheet){

        $scope.items = [
          { name: 'Hangout', icon: 'hangout' },
          { name: 'Mail', icon: 'mail' },
          { name: 'Message', icon: 'message' },
          { name: 'Copy', icon: 'copy2' },
          { name: 'Facebook', icon: 'facebook' },
          { name: 'Twitter', icon: 'twitter' }
        ];

        $scope.listItemClick = function($index) {

          var clickedItem = $scope.items[$index];
          $mdBottomSheet.hide(clickedItem);

        };

      })
      .controller('ListBottomSheetCtrl',function($scope, $mdBottomSheet){

        $scope.items = [
          { name: 'Share', icon: 'share' },
          { name: 'Upload', icon: 'upload' },
          { name: 'Copy', icon: 'copy' },
          { name: 'Print this page', icon: 'print' }
        ];
      
        $scope.listItemClick = function($index) {
          var clickedItem = $scope.items[$index];
          $mdBottomSheet.hide(clickedItem);
        };

      });
*/
})();

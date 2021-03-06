(function(){
  "use strict";
  
  angular
      .module('app.module.core')
      .controller('GridBottomSheetCtrl',function($scope, $mdBottomSheet){

        $scope.items = [
          { name: 'Hangout', icon: 'hangout' },
          { name: 'Mail', icon: 'mail' },
          { name: 'Message', icon: 'message' },
          { name: 'Copy', icon: 'copy2' },
          { name: 'Facebook', icon: 'facebook' },
          { name: 'Twitter', icon: 'twitter' },
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

})();


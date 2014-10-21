angular.module('boardGameStore', ['ngAnimate', 'ui.router', 'components', 'boardGameServices', 'hello', 'store', 'detail'])

  .run(function ($state) {
    $state.go('store');
  })

angular.module('todoapp')
    .directive('todoItem', function (){
      return {
        restrict: 'E', //엘레먼트 == 요소 
        scope: {        // 디렉티브 스코프 설정
          todo: '=',    // 양방향 바인딩
          remove: '&'   // 참고 바인딩. 함수 설정시 사용함
        },
        template:
          '<input type="checkbox" data-ng-model="todo.completed" ng-click="update(todo)">' +
          '<input type="text" data-ng-model="todo.title" ng-blur="update(todo)">' +
          '<button type="button" data-ng-click="remove(todo)">삭제</button>'
      }
    })
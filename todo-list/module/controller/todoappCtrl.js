angular.module('todoapp')
    .controller('todoappCtrl', function ($scope, todoappStorage) {

      $scope.todos = todoappStorage.get();

      
      $scope.addTodo = function (todoTitle) {
        todoTitle = todoTitle.trim();
        if (!todoTitle) return;
        todoappStorage.post(todoTitle)
      };

      $scope.remove = function (id) {
        if (!id) return;
        todoappStorage.delete(id);
      }

      $scope.$watch('status', function () {
        if ($scope.status === 'Completed') {
          $scope.statusFilter = { completed: true };
        } else if ($scope.status === 'Active') {
          $scope.statusFilter = { completed: false };
        } else {
          $scope.statusFilter = {};
        }
      });

      $scope.clearCompleted = function () {
        todoappStorage.deleteCompleted();
        $scope.status='';
      }


    });
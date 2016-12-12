//그리드시스템 보기 토글 단축 버튼 SHIFT + G
(function(global){
  'use strict';
  var body = document.body;
  var containers = document.querySelectorAll('.grid-container');
  document.onkeydown = function(event) {
    if( event === true || event.keyCode === 71 && event.shiftKey) {
      Array.prototype.forEach.call(containers, function(container) {
        container.classList.toggle('show-grid');
      });
    }
  };
})(this);

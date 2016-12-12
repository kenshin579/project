(function(global){
  'use strict';
  var container = document.querySelector('.slider_img_wrap');
  var container_width = container.clientWidth;
  // console.log(container_width);
  // 이미지뷰 요소
  var img_view = document.querySelector('.slider_imgages');
  var img_view_picture = img_view.querySelectorAll('img');
  // console.log(img_view);
  // console.log(img_view_picture);

  img_view.style.width = container_width * img_view_picture.length + 'px';
  // console.log(img_view.style.width);

  //indicator
  var indicator_btn = document.querySelectorAll('.indicator_btn');
  // console.log(indicator_btn);

  //상태변수
  var select_num = 0;
  var select_item = null;
  var item;

  //인디케이터 순환
  for(var i =0, l = indicator_btn.length ; i<l ; i++){
    // console.log(indicator_btn[i]);
    var index = indicator_btn[i];
    index.num = i;
    
    index.onclick = function(e){
      // console.log(this);
      // console.log(this.num);
      item = this;

      // 온이 있다면라면 온클래스를 지우고 오프를 추가 해라
      if( select_item != null ){
        select_item.classList.remove('btn_on');
        select_item.classList.add('btn_off');
      }

      // 자신에게 온클래스를 추가
      item.classList.add('btn_on');
      item.classList.remove('btn_off');
      select_item = item;

      select_num = this.num;
      imgMove(select_num);

      return false;
    };
  }

  indicator_btn[0].onclick();

  var prev_btn = document.querySelector('.prev_btn');
  var next_btn = document.querySelector('.next_btn');
  // console.log(prev_btn);

console.log(select_num);

  next_btn.onclick = function(){
    select_num++;
    if(select_num > img_view_picture.length-1){
      select_num = 0;
    }
    imgMove(select_num);
    indicator_btn[select_num].onclick();
  };

  prev_btn.onclick = function(){
    select_num--;
    if( select_num < 0 ){
      select_num = img_view_picture.length - 1;
    }
    imgMove(select_num);
    indicator_btn[select_num].onclick();
  }


function imgMove(num){
  img_view.style.transform = 'translateX( -'+ (container_width * num) +'px)';
}


  //------------------------------------------------------
  

})(this);
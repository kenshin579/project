(function(global, $){
  'use strict';

  // ---------------[ MODAL CONTENT ]------------------

  var font_article     = document.querySelectorAll('.font-article'),
      first_view_wrap  = font_article[0].querySelector('.view-wrap'),
      detail_view_btn  = document.querySelectorAll('.detail-view-btn'),
      btn_length       = detail_view_btn.length,
      modal_wrap       = document.querySelector('.modal-wrap'),
      modal_content    = modal_wrap.querySelector('.modal-content'),
      modal_view_wrap  = modal_wrap.querySelector('.modal-view-wrap'),
      modal_font_name  = modal_wrap.querySelector('.modal-font-name'),
      detail_close_btn = modal_wrap.querySelector('.detail-close-btn');

  // IE8 대응 : 문서의 높이값 가져오기
  var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  // 폰트 뷰 버튼들 순환해서 이벤트 걸기
  for(var i=0;i<btn_length;i++){
    // 상태변수 : 각 인덱스값 저장
    var view_btns = detail_view_btn[i];
    view_btns.num = i;

    // 폰트 뷰 버튼들 인덱스 순으로 클릭이벤트
    detail_view_btn[i].onclick = function(e){
      // 이벤트를 실행한 대상요소의 인덱스값 저장
      var index = this.num;

      // 대상의 폰트네임 저장후 모달 콘텐츠에 동적으로 적용
      var font_name = font_article[index].querySelector('.font-name');
      modal_font_name.innerText = font_name.innerText;
      
      // 폰트 뷰에 대상의 인덱스에 맞는 폰트클래스 적용
      addClass(modal_view_wrap, "font-" + (index+1));

      // 모달이 오픈되면서 비활성화될 부분 높이 설정
      modal_wrap.style.height = height + 'px' ;
      // 모달 콘텐츠 오픈
      addClass(modal_wrap, 'modal-on');
      // 비활성화된 부분의 스크롤을 없앰.
      document.body.style.overflow = 'hidden';
    };

  }

  // 모달 콘텐츠 클로즈
  detail_close_btn.onclick = function(){
    // 모달 닫힘
    removeClass(modal_wrap, 'modal-on');

    // 폰트클래스 가져와서 기존에 적용된 클래스 삭제
    var change_class = modal_view_wrap.className;
    change_class = change_class.charAt(change_class.length-1);
    removeClass(modal_view_wrap, "font-" + change_class);
    document.body.style.overflow = 'auto';

    // 컬러 픽 닫힘 
    removeClass(color_table_wrap, "pick-open");

    // 핸들아이콘은 기본위치로
    $(handring_icon).offset({left : icon_location});
    // 아이콘의 위치에 따라 폰트도 기본으로 변경
    var size_value = moveSize(icon_location);
    $(modal_view_wrap).css('fontSize', size_value);

    // 폰트 컬러 기본값으로 변경
    var origin_color = $(first_view_wrap).css('color');
    modal_view_wrap.style.color = origin_color;
  };

// ---------------[ FONT SIZE ]------------------

  var handring_icon = document.querySelector('.handring-icon'),
      area_line     = document.querySelector('.area-line'),
      $target       = null,
      drag          = false;

  // 아이콘 초기값 위치
  // 0. 원래 폰트사이즈 나올때의 위치값 알아내기
  // 1. 우선 폰트사이즈를 가져와 얼마인지
  var size = $(modal_view_wrap).css('fontSize');
  // 1-1. 숫자만 가져오기 : 단위제거 , 숫자로 형변환
  // moveSize() 함수 계산식 참고 
  // (원래폰트값 - 최소폰트값) * 분리되는단위 
  size = (size.replace(/[^0-9]/g, '')) * 1;
  var icon_location = (( size - 5 ) * 2 );
  // 2. 핸들의 위치를 조정해보자 : offset 절대좌표
  $(handring_icon).offset({left : icon_location});


  // 아이콘 이벤트 : 마우스 버튼을 누를 때
  $(handring_icon).on('mousedown', function(evt){
  
    $target = $(this);
    drag = true;

    // 아이콘 움직임 이벤트 : 마우스를 움직일 때
    $(area_line).on('mousemove', function(evt){
      // 마우스 위치 == 클릭한 영역
      var changeX = evt.clientX;
      // 클릭한 icon 위치를 마우스 위치로 설정
      $target.offset({ left:changeX });

      // 아이콘 움직임에 따라 폰트에 대입할 사이즈값 가져오기
      var size_value = moveSize(changeX);
      // 폰트사이즈 설정
      $(modal_view_wrap).css('fontSize', size_value);
    });

  });

  // 아이콘 정지 이벤트 : 마우스 버튼을 뗄 때 발생
  $(handring_icon).on('mouseup',function(evt){
      // 초기화
      drag = false;
      $target = null;
      $(area_line).off('mousemove');
  });


  // ------------------ 함수 ------------------ 

  // 움직인만큼 폰트 사이즈 값반환
  function moveSize(x){
    // 핸들링이 움직이는 라인의 
    // 예를들어 (환경마다 다름)
    // 영역은 대략 303~430 정도의 움직임이 보임 : 130단계정도
    // 라인의 위치는 303
    // 움직임의 위치 - 라인의 시작점위치 
    var num = x - $(area_line).offset().left;
    // 5 => 폰트 최소값 , 2 => 영역 분리되는 단위
    var val = (num/2) + 5;
    // 폰트값 소숫점 안나오게 소숫점 절삭.
    return Math.floor(val);
  }



  // ---------------[ COLOR PICK ]------------------

  // PICK 버튼 클릭 이벤트
  var color_btn        = document.querySelector('.color-btn'),
      color_table_wrap = document.querySelector('.color-table-wrap'),
      color_table      = document.querySelector('.color-table'),
      color_ol         = color_table.querySelectorAll('.color-ol');


  color_btn.onclick = function(){
    var btn_val   = "CLOSE",
        btn_state = this.value.indexOf('CLOSE') > -1;

    // false(-1 나오면) 라면
    if(!btn_state){
      // 버튼값은 클로즈
      color_btn.value = btn_val;
      // 컬러칩은 오픈
      addClass(color_table_wrap, "pick-open");
    }else{
      // 버튼은 픽으로
      btn_val = "PICK";
      color_btn.value = btn_val;
      // 컬러칩은 닫힘
      removeClass(color_table_wrap, "pick-open");
    }
  };


  // 각 컬러들 대상 찾아서 colorEvent 함수 연결
  for(var i=0;i<color_ol.length;i++){
    var color_lists = color_ol[i].querySelectorAll('li'),
        color_num   = color_lists.length;

    colorEvent(color_lists);
  }

  // 각 컬러마다 이벤트 설정
  function colorEvent(list){ 
    for(var i=0;i<color_num;i++){
      list[i].onclick = colorValue;
    }
  }

  // 컬러값 뽑아내서 클릭하면 미리보기 텍스트에 컬러 설정
  function colorValue(){
    var $this_el  = $(this),
        color_val = $this_el.css('backgroundColor');

    modal_view_wrap.style.color = color_val;
  }


  // ---------------[ HELPPER FUNCTION ]------------------

  // 클래스 추가 
  function addClass(el, class_name) {
    // 순환문에서 사용할때 클래스가 계속 추가되는 현상 방지
    // 클래스에 내가 추가하려는 클래스명이 있는지 확인후 
    var is_showing = el.className.indexOf(class_name) > -1;
    // 있으면 실행말고 나가
    if( is_showing ){ return; }
    // 없으니까 추가돼
    // " " 공백 넣어서 클래스 추가 
    el.className += " " + class_name;
  }

  // 클래스 제거
  function removeClass(el, class_name) {
    // 정규식표현 : 문자 앞 뒤 부분 공백 한개씩
    var ck = new RegExp( "(\\s|^)"  +  class_name  + "(\\s|$)");
    // myTrim() 사용해서 단어의 앞과 뒤의 공백지움. 
    var trim_val = el.className.replace( ck , ' ');
    el.className = myTrim(trim_val);
  }

  // trim() 최신, ie9 이상 지원 : ie8 support
  function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }

  // 투글 클래스
  function toggleClass(el, class_name) {
    // indexOf()를 사용해서 클래스가 있는지 확인함. 불리언값을 반환
    var is_showing = el.className.indexOf(class_name) > -1;
    if( is_showing ){
      removeClass(el, class_name) 
    }else{
      addClass(el, class_name)
    }
  }

})(this, jQuery);
(function(global, XHR){
  'use strict';

  // 변수 : 대상찾기
  var result_view = document.querySelector('.building_info_wrap');

  // 사용자 함수 :  for IE6, IE5 대응
  var createXHR = (function(){
    XHR = XHR || ActiveXObject('Microsoft.XMLHTTP');
    return function () {
        return new XHR;
    };
  })();

  // XMLHttpRequest 객체생성
  var xhr = createXHR();

  // open() : 비동기 통신
  xhr.open('GET', 'data/items.json');


  // 비동기 통신 객체에 이벤트 핸들러 바인딩
  xhr.onreadystatechange = function() {
    // this === xhr 객체
    // console.log(this); 
    if ( this.status === 200 && this.readyState === 4 ) {
      // console.log('통신 데이터 전송 성공!');

      // JSON : text file
      var building_info = this.response;

      // [ text -> object ]
      // JSON 객체의 parse() 메소드를 사용
      // JSON.parse( JSON 문자열 )
      building_info = JSON.parse(building_info);

      var building_data = building_info.datas;

      var template = '<div>';

      // people 반복 순환 처리
      for ( var info of building_data ) {
        var item = info.building;
        item.fulladdress = `${item.address1} ${item.address2} ${item.address3}`;

        template += '<div class="building_img_wrap">';
        template += '<img src="'+ item.img +'" alt="고려아카데미텔 건물 사진">';
        template += '</div>';
        template += '<div class="building_txt_wrap">';
        template += '<h3 class="building_name">' + item.name + '</h3>';
        template += '<ul class="building_txt">';
        template += '<li class="fulladdress">' + item.fulladdress + '</li>';
        template += '<li>' + item.floor + '</li>';
        template += '<li>' + item.rooms + '</li>';
        template += '<li>' + item.established + '</li>';
        template += '</ul>';
        template += '</div>';
        
      }
      template += '</div>';

    } else {
      // console.log('통신 데이터 전송 실패!');
      result_view.textContent = '[' + this.statusText + '] ' + '데이터 로드에 실패했습니다....';
    }

    result_view.innerHTML = template;
  }




  xhr.send();


})(this, this.XMLHttpRequest);

/////////////////////////////////////////////////////////////
//
//  * 사용자 정의 함수
//
/////////////////////////////////////////////////////////////


// 클래스 추가 
function addClass(el, class_name) {
  // 순환문에서 사용할때 클래스가 계속 추가되는 현상 방지
  // 클래스에 내가 추가하려는 클래스명이 있는지 확인후 
  var is_showing = el.className.indexOf(class_name) > -1;
  // 있으면 실행말고 나가
  if( is_showing ){ return; }
  // 없으니까 추가돼
  // " " 공백 넣어서 클래스 추가 
  // 왜?  안그럼 기존에 있던 클래스랑 봉백없이 붙어버림 한개의 단어가 되어버림
  // 예) btn on 이 되어야하는데 btnon 이 되어버림
  el.className += " " + class_name;
}

// 클래스 제거
function removeClass(el, class_name) {
  // 정규식표현
  // \s 공백  |  ^ 문자 시작
  // 앞 | 뒤   ==> 문자 첫번째에 공백을!
  // \s 공백 | 선택 $ 문자 끝
  // 앞 | 뒤   ==> 문자 마지막번째에 공백을!
  var ck = new RegExp( "(\\s|^)"  +  class_name  + "(\\s|$)");

  // addClass 코드를 보면 클래스가 추가될 때 공백이 하나씩 생겨서 붙는다.
  // 그래서 trim() 메서드를 사용해서 단어의 앞과 뒤의 공백지움. 
  el.className = el.className.replace( ck , ' ').trim();
}
(function(global){
  'use strict';

  /**
   * ----------------------------------------------------------
   * 이미지 콘텐츠 
   * 이미지 3초 마다 자동으로 슬라이딩 구현
   * 슬라이드 이미지 클릭시 모달 콘텐츠 구현
   * 모달 콘텐츠가 뜨면 다음, 이전 버튼으로 이미지 슬라이드 구현
   * ----------------------------------------------------------
   */

  // 변수선언
  var body = document.body,
      slider_wrap = document.querySelector('.slider_wrap'),
      slider_width = slider_wrap.clientWidth,
      img_view = slider_wrap.querySelector('.images_wrap'),
      imgs = img_view.querySelectorAll('img'),
      img_length = imgs.length,
      modal_wrap = document.querySelector('.modal_wrap'),
      show_img = document.querySelector('.show_img'),
      inner_height = window.innerHeight;

  // 뷰영역 : 브라우져 너비 * 이미지 갯수
  img_view.style.width = slider_width * img_length + 'px';


  // 각 캐러셀 콘텐츠 순환 : 브라우져 너비만큼 이미지영역 너비를 설정
  for ( var i = 0 ; i < img_length ; i++ ) {
    // 각 이미지 너비값 지정
    imgs[i].style.width = slider_width + 'px';

    // 이미지의 인덱스 값을 할당
    var img_tabs = imgs[i];
    // 인덱스 값의 .num 속성을 만들어 i값을하당
    img_tabs.num = i;

    // 이미지를 클릭하면 모달콘텐츠 구현
    img_tabs.onclick = function(){
      // 이미지의 인덱스 값 할당
      var this_img = this.num;
      // 바디의 스크롤 제거
      body.style.overflow = 'hidden';
      // 모달 백그라운드 콘텐츠의 높이를 브라우져의 높이로 설정
      modal_wrap.style.maxHeight = inner_height + 'px' ;
      // 모달 콘텐츠 클래스 추가 : 모달 콘텐츠 오픈
      addClass(modal_wrap, 'modal_on');
      // 모달안에 있는 이미지 요소 속성값 제어
      show_img.setAttribute('src','img/room-0'+ (this_img + 1) +'.jpg');
      // 이미지 슬라이드 멈춤
      clearInterval(moving_img);
    };
  }

  // 버튼요소 찾기
  var btn_close = document.querySelector('.btn_close'),
      previous_btn = document.querySelector('.previous_btn'),
      next_btn = document.querySelector('.next_btn');
  // 상태 변수
  var idx = 0;

  // 클로즈 버튼
  btn_close.onclick = function(){
    // 바디의 스크롤바 부분은 자동으로..
    body.style.overflow = 'auto';
    // 모달 콘텐츠 클래스 추가 : 모달 콘텐츠 숨김
    removeClass(modal_wrap, 'modal_on');
    // 이미지 슬라이드 다시 시작
    setInterval(movingImg, 3000);
  };
  // 이전 이미지 보기 버튼
  previous_btn.onclick = function(){
    idx--;
    if(idx < 0 ){ idx = img_length-1; }
    show_img.setAttribute('src','img/room-0'+ (idx + 1) +'.jpg');
  };
  // 다음 이미지 보기 버튼
  next_btn.onclick = function(){
    idx++; 
    if(idx > img_length-1 ){ idx = 0; }
    show_img.setAttribute('src','img/room-0'+ (idx + 1) +'.jpg');
  };

  // 3초 마다 이미지 자동 슬라이드
  var moving_img = setInterval(movingImg, 3000);

  // 이미지 무빙 기능
  function movingImg(){
    idx++; 
    if(idx > img_length-1 ){ idx = 0; }
    img_view.style.transform = 'translateX( -'+ (slider_width * idx) +'px)';
  }


  // 디바이스가 리사이즈되면 사이즈 조정 다시!!
  window.onresize = function() {
    slider_width = slider_wrap.clientWidth;
    // 뷰영역 : 브라우져 너비 * 이미지 갯수
    img_view.style.width = slider_width * img_length + 'px';
    // 각 캐러셀 콘텐츠 순환 : 브라우져 너비만큼 이미지영역 너비를 설정
    for ( var i = 0 ; i < img_length ; i++ ) {
      imgs[i].style.width = slider_width + 'px';
    }
  }



})(this);

/**
 * -------------------------------------------------------
 * 다음 지도 API
 * 사용 가이드 : http://apis.map.daum.net/web/guide/
 * -------------------------------------------------------
 */

//지도를 담을 영역의 DOM 레퍼런스
var container = document.getElementById('map');
//지도를 생성할 때 필요한 기본 옵션
var options = {
  //지도의 중심좌표. => 역삼역 
  center: new daum.maps.LatLng(37.49982, 127.03501),
  level: 3 //지도의 레벨(확대, 축소 정도)
};

// 지도를 생성 
var map = new daum.maps.Map(container, options);

// 마커 이미지의 주소, 마커 이미지의 크기
var markerImageUrl = '../img/map-marker.png', 
    markerImageSize = new daum.maps.Size(40, 42), 
    markerImageOptions = { 
        // 마커 좌표에 일치시킬 이미지 안의 좌표
        offset : new daum.maps.Point(20, 42)
    };

// 마커 이미지를 생성
var markerImage = new daum.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);

// 지도에 마커를 생성하고 표시
var marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(37.49982, 127.03501), // 마커의 좌표
    image : markerImage, // 마커의 이미지
    map: map // 마커를 표시할 지도 객체
});

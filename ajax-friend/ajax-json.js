(function(global, XHR){
  'use strict';

  // 변수 : 대상찾기
  var result_view = document.querySelector('.friend_list_view');
  var call_ajax_btn = document.querySelector('.call_btn');
  var th_btn = document.querySelector('.th_btn');
  var list_btn = document.querySelector('.list_btn');
  var relode_btn = document.querySelector('.relode_btn');

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
  xhr.open('GET', 'https://randomuser.me/api/?results=10&nat=gb,br');

  xhr.setRequestHeader( 'Access-Control-Allow-Headers', '*' );
  xhr.setRequestHeader( 'X-Custom-Header', 'pingpong' ); 
  xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
  xhr.setRequestHeader( 'Content-Type', 'text/plain ' );

  // 비동기 통신 객체에 이벤트 핸들러 바인딩
  // onreadystatechange : 대상과의 통신이 끝났을 때 호출되는 이벤트
  xhr.onreadystatechange = function() {
    //통신상태 와 통신결과가 
    if ( this.status === 200 && this.readyState === 4 ) {
      // console.log('데이터 전송');
      // JSON
      var random_users = this.response;  // text file
      // console.log(typeof random_users); // string
      // [ text -> object ]
      // JSON 객체의 parse() 메소드를 사용
      // JSON.parse( JSON 문자열 )
      // [ text <- object ]
      // JSON 객체의 stringify() 메소드를 사용
      // JSON.stringify( JavaScript(JSON 형태) 객체 )
      
      random_users = JSON.parse(random_users); // text -> object

      var people = random_users.results;

      var template;
      template = '<ul>';
      // people 반복 순환 처리
      for ( var person of people ) {
        person.fullname = `${person.name.first} ${person.name.last}`;
        // console.log(person.fullname);
        // console.log(person.email);
        // console.log(person.picture.medium);
        template += '<li class="friend_list">';
        template += '<div class="f_profile">';
        template += '<h3 class="f_name">' + person.fullname + '</h3>';
        template += '<h4 class="readable-hidden"> profile image </h4>';
        template += '<p class="f_picture"><img src=" ' + person.picture.medium + ' "alt="img"></p>';
        template += '<div class="f_contact">';
        template += '<h4 class="readable-hidden">Contact</h4>';
        template += '<p> <span class="f_phone">' + person.cell +  '</span>' + person.email + '</p>';
        template += '</div>';
        template += '</div> </li>';
      }
      template += '</ul>';
    }
    // console.log(xhr);
    // 리스트 뷰
    result_view.innerHTML = template;

    // 초기 리스트 정렬 저장 : 나중에 리스트 버튼 클릭시 사용하기 위해
    var start = result_view.innerHTML;

    //------------- 썸네일 정렬 보기 버튼 ------------------ 
    th_btn.onclick = function(){

      // 썸네일, 리스크 버튼 온오프
      th_btn.classList.add('on');
      list_btn.classList.remove('on');

      // console.log(template);
      template = '<ul class="thumbnail_wrap">';
        // people 반복 순환 처리
        for ( var person of people ) {
          template += '<li class="thumbnail">';
          template += '<p><img class="th_img" src=" ' + person.picture.large + ' "alt="img"></p>';

          //모달
          template += '<div class="modal_wrap">';
          template += '<div class="modal_profile">';

          template += '<p class="modal_img_wrap"><img class="modal_img" src=" ' + person.picture.large + ' "alt="img"></p>';
          //
          template += '<h3 class="modal_name">' + person.fullname + '</h3>';
          template += '<h4 class="modal_contact">Contact</h4>';
          template += '<p> cell phone : ' + person.cell + '</p>';
          template += '<p> e-mail : ' + person.email + '</p>';
          // 모달 클로즈 버튼
          template += '<button class="modal_close" type="button">close</button>';
          template += '</div>'; // 모달 프로필 끝
          template += '</div>'; // 모달 랩핑 끝 
          template += '</li>';
        }
        template += '</ul>';
        // 리스트 뷰
        result_view.innerHTML = template;

        // 변수 : 썸네일일때의 대상 찾기
        var th_img = document.querySelectorAll('.th_img');
        var th_num = th_img.length;
        var modal_wrap = document.querySelectorAll('.modal_wrap');
        var modal_close = document.querySelectorAll('.modal_close');
        var index;

        // ------------------ click_img 이벤트 ------------------ 
        for(var i = 0; i < th_num; i++){
          var thumbnail = th_img[i];
          thumbnail.num = i;
          thumbnail.onclick = function(){
            index = this.num;
            modal_wrap[index].style.display = 'block';
            // 클로즈 버튼
            modal_close[index].onclick = function(){
              modal_wrap[index].style.display = 'none';
            };
          };
        }
    }; // 썸네일 정렬 끝

    // ------------------ 리스트 정렬 보기 버튼 ------------------ 
    list_btn.onclick =  function(){
      // 썸네일, 리스크 버튼 온오프
      th_btn.classList.remove('on');
      list_btn.classList.add('on');
      // 리스트 뷰
      result_view.innerHTML = start;
    };


    // // ------------------ 친구 리스트 더보기 버튼 ------------------ 
      // var more_btn = document.querySelector('.more_btn');
      // more_btn.onclick = function(){
      //   xhr.open('GET', 'https://randomuser.me/api/?results=10&nat=gb,br');

      //   template += '<ul>';
      //   // people 반복 순환 처리
      //   for ( var person of people ) {
      //     person.fullname = `${person.name.first} ${person.name.last}`;
      //     template += '<li class="friend_list">';
      //     template += '<div class="f_profile">';
      //     template += '<h3 class="f_name">' + person.fullname + '</h3>';
      //     template += '<h4 class="readable-hidden"> profile image </h4>';
      //     template += '<p class="f_picture"><img src=" ' + person.picture.medium + ' "alt="img"></p>';
      //     template += '<div class="f_contact">';
      //     template += '<h4 class="readable-hidden">Contact</h4>';
      //     template += '<p> <span class="f_phone">' + person.cell +  '</span>' + person.email + '</p>';
      //     template += '</div>';
      //     template += '</div> </li>';
      //   }
      //   template += '</ul>';

      //   result_view.innerHTML = template;
      // };

  }// 비동기 통신 객체에 이벤트 핸들러 바인딩 끝

  // 사용자 함수
  function updateViewPlace() {
    // AJAX 통신 요청 보내기
    xhr.send();
    // 버튼 비활성화 시키기 
    this.onclick = null;
    this.setAttribute('disabled', 'disabled');
  }


  // ------------------ 추천 친구 추가 버튼 ------------------ 
  call_ajax_btn.onclick = updateViewPlace;

  // ------------------ 새로고침 버튼 ------------------ 
  relode_btn.onclick = function(){
    // 버튼 초기 온오프
    th_btn.classList.remove('on');
    list_btn.classList.add('on');

    // 데이터 새로 받기
    xhr.open('GET', 'https://randomuser.me/api/?results=10&nat=gb,br');

    // 뷰단에 로딩시 보이는 데이터
    if( result_view.innerHTML == 'undefined'){
      result_view.innerHTML = '<p class="view_info">새로운 친구를 로딩 중 입니다.</p>';
    }

    // 데이터 전송
    xhr.send();
  };

  // 테스트 사용 : 로딩시 바로 센드
  // xhr.send();

})(this, this.XMLHttpRequest);
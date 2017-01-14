(function(global, XHR){
  'use strict';

  //사용자 함수
  var createXHR = (function(){
    XHR = XHR || ActiveXObject('Microsoft.XMLHTTP');
    return function () {
        return new XHR;
    };
  })();


  var xhr = createXHR();

  var result_view = document.querySelector('.friend_list_view');
  var call_ajax_btn = document.querySelector('.call_btn');
  var th_btn = document.querySelector('.th_btn');
  var list_btn = document.querySelector('.list_btn');

  // 비동기 통신
  xhr.open('GET', 'https://randomuser.me/api/?results=10&nat=gb,br');

  xhr.setRequestHeader( 'Access-Control-Allow-Headers', '*' );
  xhr.setRequestHeader( 'X-Custom-Header', 'pingpong' ); 
  xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
  xhr.setRequestHeader( 'Content-Type', 'text/plain ' );

  call_ajax_btn.onclick = updateViewPlace;

  // 비동기 통신 객체에 이벤트 핸들러 바인딩
  xhr.onreadystatechange = function() {
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
        template += '<p> <span class="f_phon">' + person.cell +  '</span>' + person.email + '</p>';
        template += '</div>';
        template += '</div> </li>';
      }
      template += '</ul>';
    }
    // console.log(xhr);
    result_view.innerHTML = template;

    // 초기 리스트 정렬 저장
    var start = result_view.innerHTML;

    // 썸네일 버튼
    th_btn.onclick = function(){

      th_btn.classList.add('on');
      list_btn.classList.remove('on');

      // console.log(template);
      template = '<ul class="thumbnail_wrap">';
        // people 반복 순환 처리
        for ( var person of people ) {
          template += '<li class="thumbnail">';
          template += '<div class="">';
          template += '<p class=""><img src=" ' + person.picture.large + ' "alt="img"></p>';
          template += '</div>';
          template += '</li>';
        }
        template += '</ul>';

        result_view.innerHTML = template;
    };

    // 리스트 버튼
    list_btn.onclick =  function(){
      th_btn.classList.remove('on');
      list_btn.classList.add('on');
      result_view.innerHTML = start;
    };

  }


  function updateViewPlace() {
    // AJAX 통신 요청 보내기
    xhr.send();
    this.onclick = null;
    this.setAttribute('disabled', 'disabled');
  }


})(this, this.XMLHttpRequest);
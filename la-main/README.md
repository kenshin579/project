##La-Main 작업일지

###사용언어 및 툴
- HTML5, CSS3, Sass, JavaScript, jQuery, Gulp

###사용기술
- 반응형 웹 (RWD) : 모바일, 태블릿, 데스크탑 3가지 버전 (모바일 기준)
- Grid System : 그리드 토글키 shift + g , BreakPoint에 따른 그리드 변화
- ScrollMasic + GreenSock 사용 ==> Parallax 구현
- Shuffle Letters Effec 사용 ==> Text Effec 구현
- BGM : esc키 BGM 정지, 버튼으로 컨트롤 가능
- 이미지 슬라이드 : 자동으로 이미지 슬라이딩, 데스크탑 버전일 때 썸네일 이미지 클릭 시 배경 변화
- Modal 콘텐츠 : STORIES 콘텐츠 클릭시 레이어팝업, 클로즈 버튼 누르면 닫힘 
- Gulp로 : Sass -> CSS로 컴파일 후 병합, Javascript 파일 병합
- CSS3 속성 사용으로 크롬브라우져에 최적화되어 있습니다.
그 외 JavaScript, jQuery 사용해 인터랙티브한 웹구현

###진행해야 할 목록
- [x] 모달 콘텐츠 구현
- [x] 모달 콘텐츠 클로즈 버튼 호버 시 찌그러진 원 모양 이쁘게 변경
- [ ] 이미지 썸네일 부분 크로스브라우징
- [ ] 크로스브라우징
- [x] 작업일지 작성…
- [ ] 나중에 제이쿼리 안 쓰고 순수 자바스크립트로 코드리펙토링

---

###문제에 대한 해결 방법 (또는 더욱 효율적인 방법)

####1. 유연한이미지
- [ 문제 ]
    + 난 모든 이미지들이 너비와 높이아 같았으면 한다.
    + 하지만 원본 이미지들의 크기가 모두 달라서 너비 단위를 %로 주면 높이들이 다 제각각
    + 그렇다고 px 고정값을 주면 이미지들은 찌그러지고 반응형이미지가 안됨
- [ 해결방법 ]
    + 우선 유연한 이미지는 콘텐츠 이미지 너비 %(퍼센트) 적용
    + 방법1. 원본 이미지 파일의 너비 높이를 모두 통일한다. (포토샵 사용해서 이미지 사이즈 조정)
    + 방법2. 이미지 요소를 감싸는 부모 요소를 만들고 부모에게 아래 같이 속성을 줌.
    ```
    .img-box{
        display: block;
        overflow: hidden;
        position: relative;
        width: 200px;
        height: 80px;
    }
    ```

####2. 이미지썸네일
- [ 문제 ]
    + 이미지 썸네일이 가로로 여백없이 나열되어 있는데 호버하거나 클릭시 테두리가 생기게 하고싶었다.
    + 하지만 보더값을 주면 썸네일들 끼리 크기가 틀어진다.
- [ 해결방법 ]
    + `box-shadow: 0 0 0 6px #000 inset;` 사용
    + => 하지만 높이를 padding-bottom : % 단위값 사용으로 다른 브라우져에서 틀어짐 고쳐야함...
    + height를 안쓰고 padding-bottom을 쓴 이유
        * 이미지의 너비가 %단위라서 브라우져의 크기에 따라 높이값이 그 비율에 맞게 변함
        * 그래서 높이를 지정해서 저 속성을 쓸수가 없었음.
        * 또한 height는 %단위가 안먹힘 그래서 padding-bottom 사용
    ```
    .slide_img_btn a.btn_on::bore,ef.slide_img_btn a:hover::before {
      position: absolute;
      width: 100%;
      padding-bottom: 69.875%;
      box-shadow: 0 0 0 6px #000 inset;
      content: "";
    }
    ```


####3. 그리드 시스템 Sass 사용해서 모듈화
- [ 문제 ]
    + 반응형 그리드를 다른 프로젝트 진행시에도 값만 변경해서 사용할 수 있도록 Sass로 만들어보자.
- [ 그리드의 유용한 점 ]
    + 문서정보를 설계하고 페이지를 구성하는데에 있어서 그리드는 이를 돕는다.
    + 표준화 작업이 가능 하고 정보구조가 명확해진다.
    + 미리 설계해둘 수 있고 모듈로 만들어서 재활용할 수 있다.
    + 레이아웃 구성을 좀더 쉽고 수월하게 진행할 수 있다.
- [ 해결방법 ]
    + ....

####4. 배경음악은 접근성을 위해 사용자가 컨트롤이 가능해야한다.
- [ 문제 ]
    + 배경음악 듣기 싫어!! 혹은 접근성 지침상 사용자가 컨트롤 가능해야 한다.
        * 왜? 화면 낭독 프로그램을 사용하는 사용자가 문서정보를 인식하는데 있어 방해받으면 안됨.
    + 3초 이상의 자동재생이 되면 안된다. 단, 3초 미만은 허용
    + 지금 라망 사이트는 3초이상의 음원에다가 자동재생이 되는 경우이다.
- [ 해결방법 ]
    + 지정된 esc키를 누루면 재생이 멈추도록 구현
    + 또한 정지, 재생 컨트롤 가능하도록 구현

####5. 스타일 제어방식 ( css() VS addClass(), removeClass() )
- [ 문제 ]
    + 제이쿼리로 css() 메서드를 사용해서 display: none, block으로 제어하는 방식
        * `$show_con.css('display', 'none');`
    + 반응형일때 브라우져의 크기가 변하면 콘텐츠가 사라진 상태에서 나타나질 않음
        * 보니까 스타일 제어 방식으로 하면 html코드에 인라인으로 스타일이 붙음
        * 그래서 모바일 크기에서 버튼을 보였다 안보였다 테스트 하다가 창을 넓이면 버튼이 누를수도 없게 아예 사라져 버렸던 것 같다.
- [ 해결방법 ]
    + addClass(), removeClass() 사용해서 클래스명을 추가하거나 삭제 하는 방식으로 제어
    ```
    //------------------ CSS -------------------
    .show_con
        display: none
    .show_con.on
        display: nblock

    //------------------ JS -------------------
    $('.open_btn').on('click', function(){ 
        $show_con.addClass('on');
    });
    $('.close_btn').on('click', function(){ 
        $show_con.removeClass('on');
    });
    ```

####6. 가상요소 접근
- [ 문제 ]
    + 데스크탑 버젼일 때 가상요소로 접근해서 배경이미지를 바꿔야하는 상황이엮다. 하지만 접근이 안됨.
    + 알고보니 제이쿼리로는 접근이 불가능... ㅠㅠㅠㅠ
- [ 해결방법 ]
    + .gallery-one 클래스를 추가 제거하는 방식으로 해결.
    + 클래스명 .large-right-con을 가진 요소에 .gallery-three가 추가 되었을 때 가상요소(::before)의 배경이미지 변경.
    ```
    //------------------ CSS -------------------
    .large-right-con.gallery-one::before {
        background-image: url(../images/chicken/slide-chicken/slide-chicken-01.jpg);
    }

    .large-right-con.gallery-two::before {
        background-image: url(../images/chicken/slide-chicken/slide-chicken-02.jpg);
    }

    .large-right-con.gallery-three::before {
        background-image: url(../images/chicken/slide-chicken/slide-chicken-03.jpg);
    }

    // 내가 접근했어야 할 가상요소 부분 : 백그라운드 이미지를 교체하고 싶었다.
    .large-right-con::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 63.63636%;
        padding-bottom: 77.2881%;
        background-image: url(../images/chicken/slide-chicken/slide-chicken-01.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        content: "";
        opacity: 1;
    }

      //------------------ JS -------------------
        var $gallery_view = $('.large-right-con');
        var count = ['one', 'two', 'three'];
        var class_name = 'gallery-';

        // bg 이미지 갤러리 클래스 삭제
        function removeClasses() {
          for ( var i=0, l=count.length; i<l; i++ ) {
            $gallery_view.removeClass(class_name + count[i]);
          }
        }

        //이미지 체인지
        function imgChange(btn, index) {
          btn.parent().siblings().find('.btn_on').removeClass('btn_on');
          $gallery_view.addClass(class_name + count[index]);
        }

        //------------------ 사용 -------------------
        // 썸네일 이미지 클릭시 이벤트 발생
        $btn.on('click', function(e) {
            removeClasses()
            imgChange($btn, index);
            ....
        });
    ```
- [ 새로운 지식 ]
    + 자바스크립트 가상요소 접근 방법
    ```
      //가상요소 스타일 값 가져오기
      window.getComputedStyle(document.querySelector('.wrap'), '::after').getPropertyValue('display');

      // 가상요소 스타일 값 변경
      document.styleSheets[0].addRule('.header_wrap::after','display: block');

    ```


####7. 탑버튼 컨트롤
- [ 문제 ]
    + 탑버튼을 누르면 부드럽게 문서의 상단으로 올라갔으면,,,
    + 스크롤이 발생하면 탑버튼이 생겼으면,,
    + 문서의 맨위로 올라갔을 땐 탑버튼이 없어졌으면,,,
- [ 해결방법 ]
    + 부드럽게 : $(대상).animate( , 시간)
    + scroll 발생시 : $(window).scroll()
    ```
    //탑버튼 부드러운 스크롤
    $('.back_top').on('click',function(e){
        e.preventDefault();
        $('html, body').animate({'scrollTop': '0px' }, 500 );
    });

    // scroll 발생시 생기는 동작들
    $(window).scroll(function(){

        //스크롤이 발생하면 탑버튼 생성
        $('.back_top').css('display', 'block');
        // console.log($(window).scrollTop());
        
        //만약 스크롤이 맨위에 있다면 == 0과 같다면
        if( $(window).scrollTop() === 0 ){
            // console.log('scroll top');
            
            // 탑버튼은 숨기고
            $('.back_top').css('display', 'none');
        }
    });

    ```

####8. 스크립트 압축
- [ 문제 ]
    + 자바스크립트 파일들을 모두 압축하고(gulp-uglify) 깃허브에 올리니 로딩시 스크립트가 제대로 실행이 안됨,,,, ㅜㅜ
- [ 해결방법 ]
    + uglify,, 오류라는데 우선 다시 프리티코드로 업로드

####9. 모달콘텐츠 참고 자료
- 첫번째방법 : html, css, javascript 제어 (display: none, block)
    + [w3schools](http://www.w3schools.com/howto/howto_css_modals.asp)
    + [w3schools](http://www.w3schools.com/howto/howto_css_modal_images.asp)
    + [이건 그냥 나중에 구현해보고 싶은 모달+이미지 슬라이드](http://www.menucool.com/slider/show-image-gallery-on-modal-popup)

- 두번째방법 : html, css만 제어
    + 이 방법은 모달 콘텐츠가 없어진게 아니라 안보여지는 것임. 그래서 탭포커스로 접근할 때 안보이지만 포커스는 접근을 한다.
        * [참고](http://www.webdesignerdepot.com/2012/10/creating-a-modal-window-with-html5-and-css3/)







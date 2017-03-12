#Web Font Gallery 작업일지
- [작업 페이지](https://sseom.github.io/project/Web-Font-Gallery/)
- [작업 소스](https://github.com/sseom/project/tree/master/Web-Font-Gallery)
- 작업자 : 윤선미(SSEOM)
- 작업 일자 : 2017.03.10 ~ 03.11
- E-mail : ysum1011@naver.com
- Portfolio Blog : http://sseom.github.io/

### 개발환경
- 운영체제 : MAC OS
- HTML4(Transitional), CSS, CSS3, Sass, Javascript, jQuery
- CDN 로드 : google Web Font, jQuery v1.12.4
- Build Tool
    - Node : v6.9.0
    - NPM : v4.0.5
    - Gulp : v3.9.1
    - 커스텀마이즈한 [Sass-Gulp-module](https://github.com/sseom/project/tree/master/Web-Font-Gallery/sass-gulp-module)
        - 사용한 plugin
            - browser-sync : v2.18.5 
                - 서버 환경 구성.
            - gulp-autoprefixer : v3.1.1 
                - CSS3 브라우저 벤더 프리픽스를 설정에 따라 자동으로 적용 처리.
            - gulp-concat : v2.6.0 
                - Javascript 파일 병합
            - gulp-csscomb : v3.0.8 
                - CSS 문서 포멧 정리 및 속성 별로 정렬
            - gulp-if : v2.0.1 
                - 조건에 따른 업무 처리
            - gulp-sass : v2.3.2 
                - sass 모듈을 로드
            - gulp-sourcemaps : v1.6.0 
                - 개발 시, Debug 용으로 사용할 소스맵을 생성.
- Editor : sublimeText3
- Test Browser : Chrom 최신버전 ( 버전 57.0.2987.98 (64-bit) )

###작업 폴더 구조
- Web-Font-Gallery : 작업 소스
    - index.html
    - css
        - style.css
    - js
        - all.js
    - sass
        - _font.sass
        - _function-mixin.sass
        - _open-color.scss
        - _common.sass
        - _main-style.sass
        - _color-table.sass
        - style.sass
- README.md : 작업 일지
- sass-gulp-module.zip 
    + package.json
    + gulpfile.js
    + gulp.config.js
    + .csscomb.json

###기능 구현 리스트
- Static Web : 콘텐츠의 너비는 브라우져창의 80%이며 910px이하로는 줄어들지 않음.
- 웹폰트 리스트에서 클릭 버튼 누르면 해당 웹폰트의 사이즈와 컬러를 미리보기 할수 있는 모달창 오픈.
- 모달 콘텐츠
    - 사이즈 조정
        - 핸들링하는 아이콘을 좌우로 움직이면 웹폰트의 사이즈 변경
    - PICK 버튼 
        - 버튼 클릭하면 컬러칩 오픈 / 클로즈
        - 투글기능 : 컬러칩이 오픈되면 PICK버튼의 텍스트는 CLOSE로 변경
        - 컬러를 클릭하면 미리보기 창에세 선택 컬러가 적용된 폰트가 보임.
    - X 버튼
        + 모달창 클로즈.
        + 컬러칩 클로즈.
        + 핸들아이콘, 폰트 뷰에서의 폰트의 크기, 컬러 디폴트값으로 돌아감.

###Sass사용
- _color-table.sass
    - _open-color.scss 임폴트해서 해당 컬러와 반복문 사용해서 컬러칩이 들어갈 클래스 이름과 색상을 순서대로 뽑아냄
- _common.sass
    + 공통으로 사용하는 모듈.
    + 대체선택자(Placeholder Selector, %)  사용
- _font.sass
    - 사용할 웹폰트 이름을 변수에 저장.
    - 웹폰트 import할때 변수에 따라 처리.
    - URL을 찾아서 처리하지 않고 사용하고 싶은 폰트를 변수에서 변경하거나 추가하거나 해서 사용.
- _function-mixin.sass
    + function : 컬러 조정하는 shade() 
        - darken() 사용하면 원하는 색이 안나옴. 엄청 탁해짐..
        - mix() 함수를 사용해서 black과 혼합함으로써 원하는 본래의색을 %(퍼센트)로 명암을 조절.
        - [참고 sass-guidelin](https://sass-guidelin.es/#syntax--formatting)
    + mixin : 위드와 하이트를 동시에 작성.
        - [참고 sass-guidelin](https://sass-guidelin.es/#mixins)

###IE8 호완 문제
1. CSS3 
    - border-radius : 지원하지 않음 
        - 해결 방법 : 정보 인식에 무리는 없기 때문에 무거운 javascript 라이브러리 사용해 성능을 저하 하는것 보단 정보가 깨지지 않는 것에 중점을 둠
    - rgba 의 알파값이 적용되지 않음
        + 모달창이 뜨면서 모달콘텐츠 뒤로는 시각적으로 비활성화 처리했는데 적용안됨.
        + 해결 방법 : background-color 속성과 값을 2번 작성
        ```
          background-color: rgb(53,49,42);
          background-color: rgba(0,0,0,0.8);
        ```
    - clearfix
        - IE8에서는 float을 적용한 콘테츠들을 감싸지 못함.
        - 해결 방법 : 비표준속성 zoom 사용.
2. 자바스크립트
    - trim() 메서드 적용안됨
        + 해결 방법 :
            * [참고 w3schools](https://www.w3schools.com/jsref/jsref_trim_string.asp)
            ```
            // 방법 1.
            // w3schools 참고
            function myTrim(x) {
                return x.replace(/^\s+|\s+$/gm,'');
            }

            // 방법 2.
            // 위와같이 함수방식으로 사용하지 않고
            // String에 프로토타입방식으로 trim 메서드 만들어서 사용
            if(typeof String.prototype.trim !== 'function') {
              String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, ''); 
              }
            }
            ```
    - 문서의 높이값 
        + window.innerHeight 가 적용이 안됨
        + 해결방법 :
            + [참고 w3schools](https://www.w3schools.com/jsref/prop_win_innerheight.asp)
            ```
            // w3schools 참고
            var height = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            ```

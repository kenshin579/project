/*

- 지금 코드는 스크립트 코드를 body요소 하단에 선언했는데
- head안에 스크립트 코드를 선언하면 렌더링이 되지 않은 상태여서 스크립트는 대상들을 못찾음. (변수들은 비어있음.)
  + **해결은 : onload 이벤트**
  + 초기화 할 대상들을 함수로 묶어줘(그룹화) 그리고 
  + 웹부라우져에 실행문서가 다 로딩된 시점에 온로드 이벤트를 걸어서 함수 실행

*/

// 전역 공간
// 로드가 되는 시점에 init함수를 실행하라
window.onload = init;

// 초기화(Init, Initialization)
function init() {
  // 지역 공간
  // 변수선언 및 요소 선택 
  var selected_num    = 0;
  var selected_tab    = null;
  var container       = document.querySelector('.carousel-container');
  var container_width = container.clientWidth;
  var view            = container.querySelector('.carousel-view');
  var view_contents   = view.querySelectorAll('img');
  var tabs            = container.querySelectorAll('.carousel-tab');
  var tabs_total      = tabs.length;
  var prev_button     = document.querySelector('.carousel-previous-btn');
  var next_button     = document.querySelector('.carousel-next-btn');


  // 이미지를 감산 콘텐츠 영역(.carousel-view) 가로 폭을 
  // 포함하는 이미지 개수의 폭을 합친 만큼 설정
  view.style.width = container_width  * tabs_total + 'px';

  // 부모 너비가 700px , 이미지가 총 4장이라면
  // 700 * 4 = 2800px 
  // view의 총너비는 2800px

  // ------------ 이때 CSS는 ----------------
  // 캐러셀 컨텐츠를 모두 감사고 있는 부모
  // .carousel-container 
  //    width: 700px;
  //    height: auto;
  //    overflow: hidden;  
  // 부모안에 있는 이미지
  // .carousel-container img  
  //    width: 100vw;  => 부모 너비 만큼 너비를 가지게 
  //    height: auto;

  // 각 이미지를 순환 처리하여 컨테이너 요소의 너비만큼 이미지 너비를 설정한다.
  for ( var k=0, j=view_contents.length; k<j; k++ ) {
    view_contents[k].style.width = container_width + 'px';
    // 이미지 너비  = 캐러셀 컨텐츠를 모두 감사고 있는 부모너비 
    // 각 이미지의 너비는 700px 된다.
  }

  //인디케이터 반복 순환 
  for (var i=0, l=tabs_total; i<l; i++) {
    var tab = tabs[i];
    tab.num = i;
    tab.onclick = function() {
      selected_num = this.num;
      activeViewContent( this, selected_num );
    };
  }


  //--------------------------------------------------
  //버튼

  prev_button.onclick = prevViewContent;
  next_button.onclick = nextViewContent;

  function prevViewContent() {
    selected_num = --selected_num % tabs_total;
    // 0 % 4 = 0
    // 3 % 4 = 3
    // 2 % 4 = 2
    // 1 % 4 = 1
    // 0 % 4 = 0
    // 3 % 4 = 3
    // ,,,,,,,,,,,
    // 나머지값 0,3,2,1 반복  
    // 나눠질 숫자는 아래 if문으로 인해 0,3,2,1,0,3 ,,, 순으로

  // 조건구문이 필요한 이유 :  if문으로 인해 0,3,2,1,0,3 ,,, 순으로 돌아가게 하려고
    //만약 상태변수 값이 0보다 작으면 구문 실행  
    if ( selected_num < 0 ) {
      // 이미지 갯수 -1 한 값을 상태변수에 할당
      // 4-1 = 3 
      selected_num = tabs_total - 1;
    }
    // console.log(active_index); // 0->3->2->1->0->3......
    activeViewContent( tabs[selected_num], selected_num );
  }

  function nextViewContent() {
    selected_num = ++selected_num % tabs_total;
    // 0 % 4 = 0
    // 1 % 4 = 1
    // 2 % 4 = 2
    // 3 % 4 = 3
    // 4 % 4 = 0
    // 5 % 4 = 1
    // ,,,,,,,,,
    // 나머지값 0,1,2,3 반복
    // console.log(active_index); // 0->1->2->3->0->1......

    activeViewContent( tabs[selected_num], selected_num );
  }

  //--------------------------------------------------
  // indicator
  function activeViewContent(tab, num) {
    // console.log(tabs);
    // console.log(num);
    // 만약 selected_item 비어있지 않다면
    if ( selected_tab !== null ) {
      //selected_item의 클래스 리스트중에 active-tab을 지워라
      selected_tab.classList.remove('active-tab');
    }
    // 나한테 클릭한 시점에 클래스 추가해줘 
    tab.classList.add('active-tab');
    // 방금 선택한걸 상태변수에 넣어줘
    selected_tab = tab; //런타임 중에 값은 바뀔수있다 

    view.style.transform = 'translateX('+ ( -1 * num * container_width )+'px)';
  }

  // 사용자 액션 시뮬레이션
  tabs[0].onclick();

}
$(function(){
	
	// container is the DOM element;
	// userText is the textbox
	
	var container = $(".logo span"); 
	
	// Shuffle the contents of container
	container.shuffleLetters();

	var gnb_navi_li = $('.gnb_navi > li');
	// console.log(gnb_navi_li);
	gnb_navi_li.shuffleLetters();
});


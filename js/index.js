/*
***第一步：初始化样式 init
*/

// 定义当前屏哪些元素有动画效果
var screenAnimateElements = {
	'.screen-1': [
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow'
	],
	'.screen-2': [
		'.screen-2__heading',
		'.screen-2__subheading',
		'.screen-2__phone',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3'
	],
	'.screen-3': [
		'.screen-3__heading',
		'.screen-3__subheading',
		'.screen-3__phone',
		'.screen-3__features'
	],
	'.screen-4': [
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__type-item_i_1',
		'.screen-4__type-item_i_2',
		'.screen-4__type-item_i_3',
		'.screen-4__type-item_i_4'
	],
	'.screen-5': [
		'.screen-5__heading',
		'.screen-5__subheading',
		'.screen-5__bg'
	]
}
// 设置屏内元素为初始状态
var setScreenAnimateInit = function(screenCls){
	// var screen = document.querySelector(screenCls);
	var screen = $(screenCls).eq(0); // 获取当前屏的元素
	var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素

	for(var i = 0; i < animateElements.length; i++){
		var element = $(animateElements[i]).eq(0);
		var baseCls = element.attr('class');
		element.attr('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
	}
}
// 设置播放屏内的元素动画
var playScreenAnimateDone = function(screenCls){
	// var screen = document.querySelector(screenCls);
	var screen = $(screenCls).eq(0); // 获取当前屏的元素
	var animateElements = screenAnimateElements[screenCls]; // 需要设置动画的元素

	for(var i = 0; i < animateElements.length; i++){
		var element = $(animateElements[i]).eq(0);
		var baseCls = element.attr('class');
		element.attr('class', baseCls.replace('_animate_init', '_animate_done'));
	}
}

$(document).ready(function(){
	for(var k in screenAnimateElements){
		setScreenAnimateInit(k);
	}
});

/*
***第二步：页面滚动到哪里，就播放到哪里
*/
var navItems = $('.header__nav-item');
var outLineItems = $('.outline__item');

var switchNavItemsActive = function(idx){
	navItems.each(function(){
		$(this).removeClass('header__nav-item_status_active');
	});
	navItems[idx].className = 'header__nav-item header__nav-item_status_active';

	outLineItems.each(function(){
		$(this).removeClass('outline__item_status_active');
	});
	outLineItems[idx].className = 'outline__item outline__item_status_active';
}

switchNavItemsActive(0);

$(window).scroll(function(){
	var top = $(document).eq(0).scrollTop();

	// 顶部导航条和右边导航栏
	if(top > 60){
		$('.header').eq(0).addClass('header_status_black');
		$('.outline').eq(0).addClass('outline_status_in');
	}else{
		$('.header').eq(0).removeClass('header_status_black');
		$('.outline').eq(0).removeClass('outline_status_in');

		switchNavItemsActive(0);
	}

	if(top > 0){
		playScreenAnimateDone('.screen-1');
	}

	if(top > 800*1 - 60){
		playScreenAnimateDone('.screen-2');

		switchNavItemsActive(1);
	}

	if(top > 800*2 - 60){
		playScreenAnimateDone('.screen-3');

		switchNavItemsActive(2);
	}

	if(top > 800*3 - 60){
		playScreenAnimateDone('.screen-4');

		switchNavItemsActive(3);
	}

	if(top > 800*4 - 60){
		playScreenAnimateDone('.screen-5');

		switchNavItemsActive(4);
	}
});

/*
***第三步：导航双向定位
 */
var setNavJump = function(i, lib){
	var item = lib[i];
	item.onclick = function(){
		$(document).eq(0).scrollTop(i * 800);
	}
}

for(var i = 0; i < navItems.length - 1; i++){
	setNavJump(i, navItems);
}

for(var i = 0; i < outLineItems.length; i++){
	setNavJump(i, outLineItems);
}

// 载入初始化
setTimeout(function(){
	playScreenAnimateDone('.screen-1');
},500);
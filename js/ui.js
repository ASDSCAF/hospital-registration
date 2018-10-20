//ui-search
$.fn.UiSearh=function(){
	var ui = $(this);
	
	$('.ui-search-selected',ui).on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	});
	$('.ui-search-select-list a',ui).on('click',function(){

		$('.ui-search-selected').text( $(this).text() );
		$('.ui-search-select-list').hide();
		return false;
	});
	//默认隐藏搜索下拉框
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	});
}

//ui-tab

/**
* @param {string} header TAB组件的所有选项卡的.item
* @param {string} content TAB组件的所有内容区域的.item
* @param {string} focus_prefix 选项卡高亮样式前缀，可选
*/
$.fn.UiTab=function(header,content,focus_prefix){
	var ui = $(this);
	var tabs=$(header+'> .item ',ui);
	var cons=$(content+'> .item ',ui);
	var focus_prefix=focus_prefix || '';

	tabs.on('click',function () {
		// body...
		var index=$(this).index();
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
		cons.hide().eq(index).show();

		return false;
	})
}
// ui-backTop
$.fn.UiBackTop =function(){
	var ui = $(this);
	var el =$('<a href="0">');
	ui.addend(el);

	var windowHeight=$(window).height();
	$(window).on('scroll',function(){
		var top=$('body').scrollTop();


	})
}

//页面的脚本逻辑
$(function () {

	$('.ui-search').UiSearh();

	$('.content-tab').UiTab('.caption> .item','.block > .item');
	$('.content-tab .block .item').UiTab('.block-caption> a','.block-caption > .block-wrap','block-caption-');

	$('body').UiBackTop();
})
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
	var tabs=$(header,ui);
	var cons=$(content,ui);
	var focus_prefix=focus_prefix || '';

	tabs.on('click',function () {
		// body...
		var index=$(this).index();
		tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
		cons.hide().eq(index).show();

		return false;
	})
}
//ui-slider
//1.左右镜头控制翻页
//2.翻页的时候下面的进度点可以点击使用翻页
//3.在第三页的时候点击下一页会回到第一页，第一页时同理
//4.进度点在点击的时候会切换到对应的页面
//5.没有任何操作的时候会自动翻页
//6.滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）
//7.高级-无缝滚动

$.fn.UiSlider=function(){
	var ui = $(this);

	var wrap=$('.ui-slider-wrap');

	var btn_prev=$('ui-slider-arrow .left',ui);
	var btn_next=$('ui-slider-arrow .right',ui);

	var items =$('.ui-slider-wrap .item',ui);
	var tips =$('.ui-slider-process .item',ui);

	//预定义

	var current = 0;
	var size=items.size();
	var width=items.eq(0).width();
	var enableAuto =true;
	//设置自动滚动（如果鼠标在wrap中，不要自动滚动）
	ui
	.on('mouseover',function(){ 
		console.log('in');
		enableAuto=false;
	})
	.on('mouseout',function(){
		console.log('out');
		enableAuto=true;
	})

	//具体操作

	wrap
 	.on('move_prev',function(){
 		if (current<=0) {
 			current=size;
 		}
 		current = current-1;
 		wrap.triggerHandler('move_to',current);
	})
	.on('move_next',function(){

		if (current>=size-1) {
			current=-1;//负一加1等于0
		}
		current = current+1;
	})
	.on('move_to',function(evt,index){
		// debugger;
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){

		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next'); 
		},3000);
	})
	.triggerHandler('auto_move');

	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function () {
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);
	})
}

//页面的脚本逻辑
$(function () {

	$('.ui-search').UiSearh();

	$('.content-tab').UiTab('.caption> .item','.block > .item');
	$('.content-tab .block .item').UiTab('.block-caption> a','.block-content > .block-wrap','block-caption-');

	// $('body').UiBackTop();

	$('.ui-slider').UiSlider();
})


/*回到顶部 2*/
 $(function(){
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>100){
                    $("#back-to-top").fadeIn(1500);
                }
                else
                {
                    $("#back-to-top").fadeOut(1500);
                }
            });
 
            //当点击跳转链接后，回到页面顶部位置
            $("#back-to-top").click(function(){
                if ($('html').scrollTop()) {
                    $('html').animate({ scrollTop: 0 }, 100);//动画效果
                    return false;
                }
                $('body').animate({ scrollTop: 0 }, 100);
                return false;
            });
        });
    });
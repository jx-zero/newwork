$(document).ready(function() {
	// 测试切换个人和企业的代码，不用的时候要删除喔！
	var tab = '<div class="tab"><a href="index.html">个人版</a><a href="ent_index.html">企业版</a></div>';
	$('body').append(tab);
	//显示岗位筛选菜单
	$('.screen').find('.s_left').bind('click', function() {
		$('.p_screen,.p_screen_main').show()
	});
	//显示之外隐藏
	$('.p_screen_colse').bind('click', function(event) {
		$('.p_screen,.p_screen_main').hide();
	});
	
	// 岗位筛选联动
	var data = [{
		"pseries":"技术类", 
		"pline":["车间主任","技术总监","维修组长","维修徒工","维修技师","钣金技师","喷漆技师"]
	},{
		"pseries":"非技术类", 
		"pline":["前台接待","服务顾问","前台主管","车间主管","库房主管","库管员","财务行政客服"]
	}]

	$.each(data, function(index, val) {
		var po = '<option value="'+index+'">'+val.pseries+'</option>';
		$('#p_cate').append(po);
	});
	$('#p_cate').change(function(event) {
		var eq=$(this).val();
        var data1=data[eq].pline;
        $('#s_post').html(' ');
        $.each(data1, function(index, val) {
        	 var po = '<option value="'+index+'">'+val+'</option>';
			$('#s_post').append(po);
        });
	});
	//雷达扫描
	$('#rader').click(function(){
		$('.p_screen,.p_screen_main').hide();
		$('.radar').show();
		setTimeout(function(){
			$('#rader_result').show();
			$('.radar').hide();
			addMarker();//向地图中添加marker
		},3000);
	});
	//地图调用
	initMap();//创建和初始化地图
});

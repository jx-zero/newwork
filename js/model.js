$(document).ready(function() {	
	// 测试切换个人和企业的代码，不用的时候要删除喔！
	var tab = '<div class="tab"><a href="index.html">个人版</a><a href="ent_index.html">企业版</a></div>';
	$('body').append(tab);
	// 顶部的tab切换
	$('.top_nav li a').click(function(event) {
		var liindex = $('.top_nav li a').index(this);
		$(this).addClass('active');
		$(this).parent('li').siblings().find('a').removeClass('active');
		 $('.result_article .member').eq(liindex).show().siblings('.result_article .member').hide();
	});	
	
	//个人信息查看的切换
	$('.memb_box_ul .memb_box_nav').bind('click', function(event) {
		var liindex = $('.memb_box_ul .memb_box_nav').index(this);
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		$('#memb_box_main .memb_box_data').eq(liindex).show().siblings().hide();
	});
	// 删除工作经验
	var del = $('.res_work_footer a');
	var work = 1;
	del.live('click', function(event) {
		if(work==1){
          return false;
       }      
		$(this).parent().parent().parent().remove();
		work--;
		console.log(work);
	});
	// 删除简历
	$('.res_del').bind('click',  function(event) {
		$(this).parent().parent().remove();
	});
	//添加工作经验
	var $html = '<table><tr><td>工作时间：</td><td id="res_work_date"><span class="p_select_box"><select name="start_date"id="start_date"required><option value="1">1980</option></select></span>年至<span class="p_select_box"><select name="end_date"id="end_date"required><option value="1">1980</option></select></span>年</td></tr><tr><td>企业名称：</td><td><input type="text"name="res_ent_name"id="res_ent_anme"required/></td></tr><tr><td>企业性质：</td><td><span class="p_select_box"><select name="res_org"id="res_org"required><option value="0">国营企业</option></select></span></td></tr><tr><td>职位名称：</td><td><span class="p_select_box"><select name="res_occ_cla"id="res_occ_cla"equired><option value="0">请选择职业分类</option></select></span><span class="p_select_box"><select name="res_occ"id="res_occ"required><option value="0">请选择职业</option></select></span></td></tr><tr><td>职位月薪：</td><td><span class="p_select_box"><select name="res_sal"id="res_sal"><option value="0"required>1000元以下</option></select></span><span style="font-size: 1rem;">注：此项可能做为搜索项</span></td></tr><tr><td>工作描述：</td><td><textarea name="res_des"id="res_des"rows="5"required/></textarea></td></tr><tr class="res_work_footer"><td colspan="2"><a href="javascript:;">[删除此工作经验]</a></td></tr></table>' ;
	$('.up_photo').click(function(event) {
		work++;
		$('#res_work_main').append($html);
		console.log(work);
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
		$('#p_cate,#ent_rec_cate,#res_occ_cla1').append(po);

	});
	$('#p_cate,#ent_rec_cate,#res_occ_cla1').change(function(event) {
		var eq=$(this).val();
        var data1=data[eq].pline;
        $('#s_post,#ent_rec_post,#res_occ1').html(' ');
        $.each(data1, function(index, val) {
        	 var po = '<option value="'+index+'">'+val+'</option>';
			$('#s_post,#ent_rec_post,#res_occ1').append(po);
        });
	});

	// 提交表单
	// 添加简历表单提交
	$("#member_addres").html5Validate(function() {
                submit_form();              
            }
  	);
	function submit_form(){
	 
 	if($("#issub").val()=="1")
		{
			alert('请勿重复提交！谢谢！');
			return false;
		}		
		var submitData = {
			/*

			对表：
			格式为：
			'数据库的值名称':"要提交的表单的值"
			*/
			'operation': 'new',
			'name': "<?php echo $userinfo['nickname']?>",
			'type': selType,
			'time': $("#yytime").val(),
			'phone': phone
		};
		//添加start
		var url = "/bba_a/index.php/second/order"; 
		$.post(url, submitData,function(data){
            if(data.status==1){//成功 跳转          
                alert("提交成功！");
                window.location.href=window.location.href;        
            }
        }, "json");
	 }
});
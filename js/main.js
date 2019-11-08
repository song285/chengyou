$(function(){
	// 退出
	$(".exit").click(function(){
		window.location.href="../index.html";
	})
	// 菜单点击切换界面效果
	$('#item1').click(function(){
		$(this).addClass('list');
		$('#item2,#item3,#item4,#item5,#item6,#item7').removeClass('list');
		$('.content-right1').slideDown();
		$('.content-right2,.content-right3,.content-right4,.content-right5,.content-right6,.content-right7').hide();
	});
	$('#item2').click(function(){
		$(this).addClass('list');
		$('#item1,#item3,#item4,#item5,#item6,#item7').removeClass('list');
		$('.content-right2').slideDown();
		$('.content-right1,.content-right3,.content-right4,.content-right5,.content-right6,.content-right7').hide();
	});
	$('#item3').click(function(){
		$(this).addClass('list');
		$('#item2,#item1,#item4,#item5,#item6,#item7').removeClass('list');
		$('.content-right3').slideDown();
		$('.content-right1,.content-right2,.content-right4,.content-right5,.content-right6,.content-right7').hide();
		localStorage.pepole=Trim($(".ng-binding").text(),"g");
		// console.log(localStorage.pepole)
	});
	$('#item4').click(function(){
		$(this).addClass('list');
		$('#item2,#item1,#item3,#item5,#item6,#item7').removeClass('list');
		$('.content-right4').slideDown();
		$('.content-right1,.content-right2,.content-right3,.content-right5,.content-right6,.content-right7').hide();
		
		//去除数据内的前中后的空格
		var str=Trim(localStorage.First,"g").replace(/上午/g,"").replace(/下午/g,"");
		var str1=str.replace(/(..)(?=[^$])/g,"$1,").split(",");

		function setCourse(obj,index){
			$(obj).text(str1[index]);
		}
		//遍历填写
		for(var i=0;i<=str1.length;i++){
			setCourse("#data"+i,i);
		}
		// console.log(str1);
	});
	$('#item5').click(function(){
		$(this).addClass('list');
		$('#item2,#item1,#item3,#item4,#item6,#item7').removeClass('list');
		$('.content-right5').slideDown();
		$('.content-right1,.content-right2,.content-right3,.content-right4,.content-right6,.content-right7').hide();

        // $(".myRecord").html(recordtable);
	});
	$('#item6').click(function(){
		$(this).addClass('list');
		$('#item2,#item1,#item3,#item4,#item5,#item7').removeClass('list');
		$('.content-right6').slideDown();
		$('.content-right1,.content-right2,.content-right3,.content-right4,.content-right5,.content-right7').hide();
	});
	$('#item7').click(function(){
		$(this).addClass('list');
		$('#item2,#item1,#item3,#item4,#item5,#item6').removeClass('list');
		$('.content-right7').slideDown();
		$('.content-right1,.content-right2,.content-right3,.content-right4,.content-right5,.content-right6').hide();
	});
	// 选课倒计时
	setInterval(
		function(){
		var dateTime=(new Date('2019/7/1')-(new Date))/1000;
		var day=Math.floor(dateTime/24/3600)+'天';
		var hour=Math.floor ((dateTime % (3600 * 24)) / 3600)+'小时';
		var minutes=Math.floor ((dateTime % 3600) / 60)+'分钟';
		var seconds=Math.floor(dateTime % 60)+'秒';
		$('#time').text("距离选课结束："+day+hour+minutes+seconds);
		if (dateTime<=0) {
			clearInterval();
			$('#time').text("选课已经结束！未选到课程的请联系老师");
		}
	},1000);
	//对话框
	$("#btn,#selfInfoSumbit,#loadNamelistSubmit").click(function(){
		$(".dialog").fadeIn().css("display","block");
		$(".popLayer").fadeIn().css("display","block");
	});
	$(".close .okay").click(function(){
		$(".dialog").fadeOut().css("display","none");
		$(".popLayer").fadeOut().css("display","none");
		$(".msg").slideDown(500).css("display","block").fadeOut(1000);
	});
	$("#close,.close .cancle").click(function(){
		$(".dialog").fadeOut().css("display","none");
		$(".popLayer").fadeOut().css("display","none");
	});
	// 个人资料修改
	$("#selfInfoChange").click(function(){
		$(".inputText,#select").attr("disabled",false);
	});
	$("#selfInfoSumbit").click(function(){
		$(".inputText,#select").attr("disabled","disabled");
	});
	$(".inputText").focus(function(){
		$(this).css("border-bottom","1px solid #f85959");
	}).blur(function(){
		$(this).css("border-bottom","1px solid #e8e8e8");
	});
	// 教师端
	// 查看选课情况
	$("#showCourInfo,iframe").mouseover(function(){
		$(".play_left,.play_right").show().css("cursor","pointer");
	}).mouseout(function(){
		$(".play_left,.play_right").hide();
	});
	$(".play_left").click(function(){
		$("#showCourInfo table").fadeIn();
		$("iframe").hide();
	});
	$(".play_right").click(function(){
		$("#showCourInfo table").hide();
		$("iframe").fadeIn();
	});
	//录入成绩
	//对话框
	$("#record").click(function(){
		$(".recordBox").fadeIn().css("display","block");
		$(".popLayer").fadeIn().css("display","block");
	});
	$("#okayRecord").click(function(){
		$(".recordBox").fadeOut().css("display","none");
		$(".popLayer").fadeOut().css("display","none");
	});
	$("#closeRecord,#cancleRecord").click(function(){
		$(".recordBox").fadeOut().css("display","none");
		$(".popLayer").fadeOut().css("display","none");
	});
	var getRecord;
	//存储成绩
	$("#okayRecord").click(function(){
		if ($("#stuNum").val()==""||$("#stuName").val()==""||$("#courseName").val()=="") {
			alert("不能为空");
		}else{
			$(".record table tbody").append("<tr><th><span class='stuNum'></span></th>\
			<th><span class='stuName'></span></th><th><span class='learnYear'></span></th>\
			<th><span class='learnDate'></span></th><th><span class='courseName'></span></th>\
			<th><span class='midRecored'></span></th><th><span class='endRecored'></span></th>\
			<th><span class='monthRecored1'></span></th><th><span class='monthRecored2'></span></th>\
			<th><span class='monthRecored3'></span></th></tr>");
			getRecord={
				stuNum:$("#stuNum").val(),
				stuName:$("#stuName").val(),
				learnYear:$("#learnYear").val(),
				learnDate:$("#learnDate").val(),
				courseName:$("#courseName").val(),
				midRecored:$("#midRecored").val(),
				endRecored:$("#endRecored").val(),
				monthRecored1:$("#monthRecored1").val(),
				monthRecored2:$("#monthRecored2").val(),
				monthRecored3:$("#monthRecored3").val()
			};
			$(".stuNum").text(getRecord.stuNum);
			$(".stuName").text(getRecord.stuName);
			$(".learnYear").text(getRecord.learnYear);
			$(".learnDate").text(getRecord.learnDate);
			$(".courseName").text(getRecord.courseName);
			$(".midRecored").text(getRecord.midRecored);
			$(".endRecored").text(getRecord.endRecored);
			$(".monthRecored1").text(getRecord.monthRecored1);
			$(".monthRecored2").text(getRecord.monthRecored2);
			$(".monthRecored3").text(getRecord.monthRecored3);

			if($("#midRecored").val()==""||$("#endRecored").val()==""||$("#monthRecored1").val()==""||$("#monthRecored3").val()==""){
				$(".midRecored").text("0");
				$(".endRecored").text("0");
				$(".monthRecored1").text("0");
				$(".monthRecored2").text("0");
				$(".monthRecored3").text("0");
			}
		}
	});
	// 提交成绩
	$("#submitRecord").click(function(){
		// var el=document.querySelectorAll(".record table tbody tr th span");
		 localStorage.record=$(".record table tbody tr th span").text();
		$(".msg").slideDown(500).css("display","block").fadeOut(500);
		console.log(localStorage.record);		
	});

	// 设置课程表
	$("#courseEditer").click(function(){
		$(".setCourse table tbody tr th,.setCourse table tbody tr th span").attr("contenteditable","true").focus(function(){
			$(this).css("border","1px solid #f85959").css("box-shadow","4px 4px 4px 4px rgba(0,0,0,0.08)");
		}).blur(function(){
			$(this).css("border","1px solid #e8e8e8").css("box-shadow","none");
		});
		$(".courtime").attr("contenteditable","false");
	});
	// 保存课程表
	$("#courseSubmit").click(function(){
		$(".setCourse table tbody tr th,.setCourse table tbody tr th span").attr("contenteditable","false");
		// 保存数据
		localStorage.First=$(".setCourse table tbody").text();
		$(".msg").slideDown(500).css("display","block").fadeOut(500);
	});
	// 查询选课组合情况
	$("#situation").click(function(){
		var selectClass=$("#selectKey").val();
        $("#table tbody tr").hide();
        $("#table tbody tr:contains('"+selectClass+"')").fadeIn();
	});
	// 去除字符串所有的
	function Trim(str,is_global){
	    var result;
	    result = str.replace(/(^\s+)|(\s+$)/g,"");
	    if(is_global.toLowerCase()=="g")
	    {
	        result = result.replace(/\s/g,"");
	     }
	    return result;
	}
	// 导入学生名单
	$("#loadNamelist").click(function(){
		$("#file").click();
		$('#file').change(function(e) {
	        var files = e.target.files;
	        var fileReader = new FileReader();

	        fileReader.onload = function(ev) {
	            try {
	                var data = ev.target.result,
	                workbook = XLSX.read(data, {
	                    type: 'binary'
	                }), // 以二进制流方式读取得到整份excel表格对象
	                persons=[]; // 存储获取到的数据
	            }catch (e) {
	                console.log('文件类型不正确');
	                return;
	            }
	     
	            // 表格的表格范围，可用于判断表头是否数量是否正确
	            var fromTo = '';
	            // 遍历每张表读取
	            for (var sheet in workbook.Sheets) {
	                if (workbook.Sheets.hasOwnProperty(sheet)) {
	                    fromTo = workbook.Sheets[sheet]['!ref'];
	                    console.log(fromTo);
	                    persons =persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
	                    // break; // 如果只取第一张表，就取消注释这行
	                }
	            }

	            //将persons赋值给要展示的表格数组里即可展示在界面
	            var ss;
	            var table="<table style='border:1.5px solid #e8e8e8;' cellspacing='0'><thead><tr style='background-color:#f4f5f6;font-weight:blod;'><th>学号</th><th>姓名</th><th>性别</th><th>年龄</th><th>年级</th><th>班级</th><th>电话</th></thead><tbody>";
	            for(var i in persons){
	                ss=JSON.parse(JSON.stringify(persons[i]));
	                table += "<tr><th>"+ss.学号+"</th><th>"+ss.姓名+"</th><th>"+ss.性别+"</th><th>"+ss.年龄+"</th><th>"+ss.年级+"</th><th>"+ss.班级+"</th><th>"+ss.电话+"</th></tr>";
	            }
	            table+="</table>";
	            $(".loadStulist").html(table);
	        };
	 
	        // 以二进制方式打开文件
	        fileReader.readAsBinaryString(files[0]);
	    });
	});
   	// 修改密码
   	$("#tcherUppsw").click(function(){
   		if ($("#befPsw").val()=="") {
   			$("#error1").css("display","inline-block").fadeIn();
   		}else{
   			$("#error1").css("display","none").fadeOut();
   		}
   		if($("#newPsw").val()==""){
   			$("#error2").css("display","inline-block").fadeIn();
   		}else{
   			$("#error2").css("display","none").fadeOut();
   		}
   		if($("#ensurePsw").val()!=$("#newPsw").val()){
   			$("#error3").css("display","inline-block").fadeIn();
   		}else{
   			$("#error3").css("display","none").fadeOut();
   		}
   	});
});

// 引入zepto-modules模块
var $ = require('zepto-modules/zepto');

require('zepto-modules/event');
require('zepto-modules/ajax');
require('zepto-modules/form');
require('zepto-modules/ie');
require('zepto-modules/touch');
module.exports = $;

var wx=require('./components/weixin/jweixin-1.0.0.js');
	$.ajax({
	  type: 'POST',
	  url: 'http://www.distanced.online/php/getsign.php',
		data:{
				url:window.location.href
			},
		dataType:'json',
	  success: function(res) {
			console.log(res);
					wx.config({
						debug:true,
						appId:res.appId,
						timestamp:res.timestamp,
						nonceStr:res.nonceStr,
						signature:res.signature,
						jsApiList:[
							'chooseImage','scanQRCode','uploadImage'
						]
					});
		}
			// },
			// error:function(xhr,type){
			// 	alert('Ajax error!')
			// }
	});

	$("#scan").on('tap',function(){
		wx.scanQRCode({
			needResult:0,
			scanType:['qrCode','barCode'],
			success:function(res){
				var result=res.resultStr;
				alert(result);
			}
		})
	});
	$("#photo").on('tap',function(){
		wx.chooseImage({
			count:1,
			sizeType:['original','compressed'],
			sourceType:['album','camera'],
			success:function(res){
				var localIds=res.localIds;
				$("#getImg").attr('src',localIds[0]);
				// alert(localIds[0]  )
			}
		})
	});


$("#mainContent").hide();

// 引入swiper模块
var Swiper = require('./components/swiper/swiper.min.js');

var swiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');


var swiper = new Swiper('.swiper-container',{
      onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
				$("#playbox").hide();
      },
      	watchSlidesProgress : true,
		onProgress: function(swiper, progress){
		for (var i = 0; i < swiper.slides.length; i++){
		var slide = swiper.slides[i];
		es = slide.style;
		es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'rotate('+0*slide.progress+'deg)';
        }
     },
	  onReachBeginning: function(swiper){
			$("#playbox").hide();
		},
      onSlideChangeEnd: function(swiper){ 
				if(swiper.activeIndex!=0){
					$("#playbox").show();
				}
        swiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
      },
			onSlideChangeStart:function(swiper){
				if(swiper.activeIndex===1){
					// console.log(1);
						var int=self.setInterval(function(){one()},50);
						var l = $("#text1").text().length; 
						var s = $("#text1").text();					   
						var arr = [];								
						for(var i = 0; i < l; i++){			
							arr[i] = s.substr(i,1);			
						}	
						var t = 0;
						function one(){			
						if(t < l){	
							// $("#text11").empty();		
							$("#text11").append(arr[t]);			
							t++;								
						}else{
							clearInterval(int);
							
						} 					  
					}
				}
				else if(swiper.activeIndex===2){
							console.log(swiper.activeIndex);
							$("#xt").addClass('xtplay');
				}
			},
			
				onSlidePrevStart: function(swiper){
								  $("#text11").empty();	 
				
				}
			
});

var IScroll = require('./components/iscroll/iscroll.js');

$('#enter').click(function(){
  $(".swiper-container").hide();
  $("#mainContent").show();
	 $("#playbox").hide();


	$.ajax({
	  type: 'GET',
	  url: 'api/skill.php',
	  dataType:'json',
	  success: function(data) {
	  	var html = "";
	  	for (var i = 0; i < data.length; i++) {
	  		html += "<li class='skillcss'>"+
			   "<span class='lileft'><i>"+data[i].type+"</i><b>"+data[i].name+"</b></span>"+
			   "<img src="+data[i].image+"></li>";
	  	};
	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});


})

// $("#footer div").tap(function(){
// 	var apiTarget = $(this).attr("id");
// 	var apiUrl = "/api/" + apiTarget + ".php";

// 	$.ajax({
// 	  type: 'GET',
// 	  url: apiUrl,
// 	  success: function(data) {
// 	  	var html = "";
	  	
// 	  	for (var i = 0; i < data.length; i++) {
// 				html += "<li style='color:red'>"+ data[i].category +"</li>";
// 	  		html += "<li>" + data[i].name  +"</li>";
// 	  	};

// 	  	$("#scroller ul").html(html);
// 	    console.log(data);
// 	  }
// 	});
// });
 $("#skill").tap(function(){
	 	$.ajax({
	  type: 'GET',
	  url: "/api/skill.php",
	  success: function(data) {
	  	var html = "";
	  	
	  	for (var i = 0; i < data.length; i++) {
				html += "<li class='skillcss'>"+
			   "<span class='lileft'><i>"+data[i].category+"</i><b>"+data[i].name+"</b></span>"+
			   "<img src="+data[i].image+"></li>";
	  	};

	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});
 });
  $("#work").tap(function(){
	 	$.ajax({
	  type: 'GET',
	  url: "/api/work.php",
	  success: function(data) {
	  	var html = "";
	  	
	  	for (var i = 0; i < data.length; i++) {
				html += "<li class='skillcss'>"+
			   "<span class='lileft'><i>"+data[i].category+"</i><b>"+data[i].name+"</b></span>"+
			   "<img src="+data[i].image+"></li>";
	  	};

	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});
 });
   $("#project").tap(function(){
	 	$.ajax({
	  type: 'GET',
	  url: "/api/project.php",
	  success: function(data) {
	  	var html = "";
	  	
	  	for (var i = 0; i < data.length; i++) {
				html += "<li class='skillcss'>"+
			   "<span class='lileft'><i>"+data[i].category+"</i><b>"+data[i].name+"</b></span>"+
			   "<img src="+data[i].image+"></li>";
	  	};

	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});
 });
   $("#me").tap(function(){
	//    console.log("wwww");
	 	$.ajax({
	  type: 'GET',
	  url: "/api/product.php",
	  success: function(data) {
	  	var html = "";
	  	
	  	for (var i = 0; i < data.length; i++) {
				html += "<li class='skillcss'>"+
			   "<span class='lileft'><i>"+data[i].title+"</i><b>"+data[i].price+"</b></span>"+
			   "<img src="+data[i].img+"</li>";
	  	};

	  	$("#scroller ul").html(html);
	    console.log(data);
	  }
	});
 });

//点击暂停播放音乐和c3动画
$("#playbox").on('tap',function(){
	if($(this).css("animationPlayState")==="paused"){
		$(this).css("animationPlayState",'running');
		$("#audio")[0].play();
	}
	else{
		$(this).css("animationPlayState",'paused');
		$("#audio")[0].pause();
	}
			
})


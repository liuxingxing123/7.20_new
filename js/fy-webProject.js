
require(["config"], function(){
	require(["jquery","include"], function($,template){
			$(function(){
				var languageBtn = $(".language"),
					sectionScroll = $(".section"),
					productScroll = $("#products"),
					aboutScroll = $("#aboutUs"),
					concactScroll = $("#concact");
				rollingCarousel("container","ul-list","li","prev","next","circles","active",2000);
				function temp(product){//模板的函数  这里是模板开始的地方
					var temp = `
							<div class="product col-lg-3 col-md-4 col-sm-6">
								<img calss="img-responsive" src=${product.src} alt=${product.alt} title=${product.title} />
								<h4><a href="#">${product.msg}</a></h4>
							</div>
							`;
					return temp;
				}
				var oFragment = document.createDocumentFragment();
				var html = "";
				$.ajax('/productData.json').then(function(data){
					var data = data || [];
					if(data.length === 0){
						alert("还未有数据");
						return false;
					}
					$.each(data,function(index,product){
						html+=temp(product);
					});
					oFragment.append(html);
					$(".hotProducts").append(html);
				}).fail(function(){
					alert("内部数据错误");
				})//这里是模板结束的地方
				
				//回到顶部
				scroll(gotop);
				//回到顶部的函数封装  利用的是缓冲运动  ，利用变量判断用户是否拖动滚动条
				//     参数id：  所点击的锚点链接的那个btn的id名称
				//     window.onload=function(){scroll("btn");}
				function scroll(id){
				    var obtn=$(id);
				    var timer = null;
				    var bSys = true;//系统拖动的滚动条
				    window.onscroll=function(){//用户拖动了滚动条   好像滚动事件必须写在一个函数里   其他函数不会执行  因为滚动的时候回一直去检测滚动事件  导致其他滚动事件不会执行
				        if(!bSys){
				            clearInterval(timer);
				        }
				        bSys=false;
				        var headerHeight = sectionScroll.offset().top,
					        aboutHeight = aboutScroll.offset().top,
					        productHeight = productScroll.offset().top,
					        concactHeight = concactScroll.offset().top,
				       	    winHeight = $(window).height();
					    var _scrollTop = $(window).scrollTop();
       				 if(_scrollTop>headerHeight - winHeight/2){
       				 	var section = 0 +"px";
       				 	$("#section .section li").css(
						"transform","translateY("+section+")"
       				 	)
       				 	
					}
       				 
       				 if(_scrollTop>productHeight - winHeight/2){
       				 	var product = 0 +"px";
       				 	$(".hotProducts .product").css(
						"transform","translateY("+product+")"
       				 	)
					}
       				 
       				 
       				if(_scrollTop>aboutHeight - winHeight/2){
       					var aboutUs = 0 +"px";
       					$("#aboutUs h2").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .aboutUsImg").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .aboutUsMsg-1").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .aboutUsMsg-2").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .theAdvantage").css("transform","translateY("+aboutUs+")")
       				}
       				
       				if(_scrollTop>concactHeight - winHeight/2){
       					$("#concact").css("transform","translate("+0+")");
       				}
				    }
				    obtn.click(function(){
				        timer = setInterval(function(){
				        	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				        	var iSpeed = Math.floor(-scrollTop/18);
				        	if(scrollTop === 0){
				        		clearInterval(timer);
				        	}
				        	bSys = true;
				        	document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
				        },30);
				    })
				}
				
				//点击之后弹出遮罩和弹框弹出层
				$(".language").click(function(){
					$("#cover").show();
					setTimeout(function(){
						$(".cover-language").css("transform","rotateZ("+0+")");
					},1000)
					
				}) 
				
				//点击关闭按钮关闭弹出层
				var rotateDeg = 360+"deg";
				$(".cover-close").click(function(){
					$(".cover-language").css("transform","rotateX("+rotateDeg+")");
					setTimeout(function(){
						$("#cover").hide();
					},1000)
				})
				
				
				//清除导航栏的active类
				$('ul.navBar > li').click(function (e) {
					e.preventDefault();
					$('ul.navBar > li').removeClass('active');
					$(this).addClass('active');
				});
				
				//根据后台数据  将相应的内容替换
				$.get("/data.json").then(function(data){
					var resData = data[0];
					console.log(resData.nav-list)
				})
				
})

//滚动无缝轮播函数的封装  
//   参数： idcontainer  最外层盒子的id
//          idUl  用来滚动的盒子id名
//          tagnameLi  用来装每张图片的标签名
//          classPrev    向前翻页的盒子类名
//          classNext   向后翻页的盒子类名
//          classCircle   用来装小圆点盒子的类名
//          className   给小圆点添加样式的类名
//          iSpeed   轮播图片切换的时间   定时器里的时间
//rollingCarousel("container","list","li","prev","next","pages","active",2000);示例
function rollingCarousel (idContainer,idUl,tagnameLi,classPrev,classNext,classCircle,className,iSpeed){
                var container = document.getElementById(idContainer);
                var oul = document.getElementById(idUl),
                    lis = oul.getElementsByTagName(tagnameLi),
                    oPrev = $(".prev"),
                    oNext = $(".next"),
                    oCircle = container.getElementsByClassName(classCircle)[0],
                    len = lis.length,
                    liWidth = lis[0].offsetWidth,
                    timer =null,
                    currentIndex=1,
                    circles=[],
                    nextIndex =2;
 
                oul.appendChild(lis[0].cloneNode(true));
                oul.insertBefore(lis[len-1].cloneNode(true),lis[0]);
                len+=2;
                oul.style.left = -liWidth+"px";
                oul.style.width = liWidth*len+'px';
                timer = setInterval(move,iSpeed);
                function move(){
                    var _left = -nextIndex*liWidth;
                    $(oul).animate({left:_left},400,function(){
                        if(nextIndex>=len){
                            oul.style.left = -liWidth +"px";
                            currentIndex = 1;
                            nextIndex =2;
                        }else if(nextIndex<=1){
                            currentIndex=len-2;
                            nextIndex=len-1;
                            oul.style.left=-liWidth*(len-2)+"px";
                        }
                    });
                    var circleIndex  = nextIndex>=len-1? 0:(nextIndex<=0?len-3:nextIndex-1);
                    for(var i=0;i<len-2;i++){
                        circles[i].className="";
                    }
                    circles[circleIndex].className=className;
                    currentIndex = nextIndex;
                    nextIndex++;
                }
                oPrev.click(function(){
                    nextIndex = currentIndex-1;
                    move();
                })
                oNext.click(move);
 
                for(var i=0;i<len-2;i++){
                    var _circle = document.createElement("div");
                    oCircle.appendChild(_circle);
                    circles.push(_circle);
                    _circle.index = i;
                    if(i===0)
                        circles[0].className = className;
                    circles[i].onclick=function(){
                        var idx = this.index;
                        nextIndex = idx+1;
                        move();
                    }
 
                }
                container.onmouseenter = function(){
                    clearInterval(timer);
                    oPrev.show();
                    oNext.show();
                }
                container.onmouseleave = function(){
                    timer = setInterval(move,iSpeed);
                    oPrev.hide();
                    oNext.hide();
                }
                }

});
});
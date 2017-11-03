define(["jquery"],function($){
	$.get("http://127.0.0.1:8080/include/header.html").then(function(data){
			$(data).appendTo(".headerBox");
	});
	$.get("http://127.0.0.1:8080/include/footer.html").then(function(data){
			$(data).appendTo(".footerBox");
	});
	
});
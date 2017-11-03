require.config({
	paths:{
		"jquery":"http://127.0.0.1:8080/js/jquery-3.1.1.min",
		"bootstrap":"http://127.0.0.1:8080/js/bootstrap.min",
		"include":"http://127.0.0.1:8080/js/include"
			},
	shim:{
		"fly" : {
            deps : ["jquery"]
        }
	}
});
$(function () {

	var element = document.getElementById("introduce_2");
	var insertHtml;
	var dataIn = [];


	//document.getElementById("text").value = "ss";
	annyang.addCallback("start", function () {
		console.log("start");
	});
	annyang.addCallback("error", function () {
		//console.log("error");
	});
	annyang.addCallback("end", function () {
		//console.log("end");
	});
	annyang.addCallback("soundstart", function () {
		//console.log("soundstart");
	});
	annyang.addCallback("result", function (data) {
		console.log("result");
		console.log(data[0]);
		// insertHtml = data[0];
		// element.innerHTML = insertHtml;

		// dataIn = data[0].split(" ");
		/*
		if (dataIn.indexOf("진짜")) {
			console.log("진짜 있음");
			element.inerHTML = "종강 진짜 하고싶죠? ㅋㅋ";
		}
		console.log(dataIn);
		*/
	});
	annyang.addCallback("resultMatch", function () {
		//console.log("resultMatch");
	});
	annyang.addCallback("resultNoMatch", function () {
		//console.log("resultNoMatch");
		setTimeout(function(){ restart(); },3000);
		
	});
	annyang.addCallback("errorNetwork", function () {
		//console.log("errorNetwork");
	});
	annyang.addCallback("errorPermissionBlocked", function () {
		//console.log("errorPermissionBlocked");
	});
	annyang.addCallback("errorPermissionDenied", function () {
		//console.log("errorPermissionDenied");
	});

	annyang.start({
		autoRestart: true,
		continuous: true
	});


});

function restart() {
	annyang.abort();
	annyang.start({
		autoRestart: true,
		continuous: true
	});
}
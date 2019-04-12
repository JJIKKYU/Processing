var yoff = 0.0; // 2nd dimension of perlin noise
var yoff_2 = 0.0;
var access = 0;
var i = 0;
var hi = 1000;
var defaultH = 750;

/* HTML DOM 관련 변수 */
var canvas;
var nameBool = true; // 이름을 말했는지 안 했는지 체크
var div_id_contents;
var div_id_section1;
var p_class_introduce;
var p_class_introduce_2;
var Texts = "안녕하세요! <br> 저를 태그해주세요!";
var Texts_C;
var Button;


/* 아두이노 통신 관련 */
var serial; // 아두이노 넣을 변수
var portName = 'COM5'; // 아두이노 통신 포트
var name; // 이름 확인
var name_Save = null; // 이름 저장
var cardTag = 0; // 한 번만 실행하기 위해 Bool 개념 [0은 노태그, 1은 태그]

/* 음성인식 관련 */
var data = "";
var data_ = "안녕 하세요";
var split_data = "";
var Listening = true;
var gender = ""; // 정진균 태그일 경우에는 여성 음성, 아닐 경우에는 남성 음성

/* 실시간 음성 반응 관련 */
var mic;
var micLevel;

/* 효과음 실행 관련 */
var logOnSound;
var logOutSound;
var resultSound;

var pdf;




//var foo;

//var msg = new SpeechSynthesisUtterance('홍현수 교수님 사랑합니다.');
//msg.lang = "ko-KR";
//window.speechSynthesis.speak(msg);


/* Output 데이터 배열 */


function preload() {
	logOnSound = loadSound('sound/logOn_1.mp3');
	logOutSound = loadSound('sound/logOut_1.mp3');
	resultSound = loadSound('sound/result.mp3');
	resultSound.setVolume(0.3);
}


/* -------------- function setup -------------- */
function setup() {
	mic = new p5.AudioIn()
	mic.start();
	
	foo = new p5.Speech();

	// pixelDensity(1);
	smooth();
	noStroke();

	// 마이크 실시간 반응용
	

	// 아두이노 시리얼통신
//	serial = new p5.SerialPort();
//	serial.open(portName);

	// 재실행시 이름 초기화
	//name = 1;

	// 캔버스 css 적용을 위한 id 설정
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.id("canvas");
	
//	pdf = createPDF();
	

	// 부모자식관계 정리하는 함수
	Awake();

	// 효과음 Setup
	//logOnSound.play();

}

/* -------------- function draw -------------- */
function draw() {
	
	
	micLevel = mic.getLevel();
	micMap = map(micLevel, 0.0001, 0.3, 0.01, 0.02);

	// 네임태그 태그를 했는지 안했는지 파악
	if (name_Save == null) {
//		serialEvent()
		namesave();
		logOn();
	}

	// 네임카드를 태그 한 번 더 태그했을 경우에는 로그아웃
	if (name_Save != null) {
//		serialEvent()
		namesave();
		logOut();
	}

	// if (access == 0) { // 테스트용
	if (name_Save == null) {
		//fill(48, 53, 114, 40);
		fill(255,100);
		rect(0, 0, windowWidth, windowHeight);
		// waveDraw(R, G, B, Opacity, xOff, yOff, mapWidth, mapHeight)  
		waveDraw(map(colorTransition(100), 0, 100, 0, 165), map(colorTransition(100), 0, 100, 0, 174), map(colorTransition(100), 0, 100, 0, 255), map(colorTransition(100), 0, 100, 0, 10), 0.003, 0.01, heightTransition(750), 760);
		waveDraw(map(colorTransition(100), 0, 100, 0, 107), map(colorTransition(100), 0, 100, 0, 118), map(colorTransition(100), 0, 100, 0, 255), map(colorTransition(100), 0, 100, 0, 30), 0.005, 0.008, heightTransition(750) - 10, 780);
		translate(width / 2, height / 2 - 10);

		for (var j = 60; j > 35; j = j - 2) {
			rotate(map(j, 60, 35, 0.05, 0.1));
			CircleDraw(j, 0, 0, 0, 50 - map(j, 60, 35, 1, 80), 0.02 - map(j, 60, 35, 0.005, 0.01), 0.002);
			// CircleDraw(i, 255, 100, 100, 100, 0.03);
			// CircleDraw(i, 255, 30, 150, 100, 0.05);
		}

	}
	// if (access == 1) { // 테스트용
	if (name_Save != null) { // acess





		fill(255, 100);
		rect(0, 0, windowWidth, windowHeight);
		waveDraw(map(colorTransition(100), 0, 100, 0, 200), map(colorTransition(100), 0, 100, 0, 228), map(colorTransition(100), 0, 100, 0, 254), 100, micMap, micMap, turnOn(680) - 10, 780);
		waveDraw(map(colorTransition(100), 0, 100, 0, 254), map(colorTransition(100), 0, 100, 0, 255), map(colorTransition(100), 0, 100, 0, 224), 100, micMap * 1.2, micMap * 1.4, turnOn(680), 780);
		translate(width / 2, height / 2 - 10);
		// CircleDraw(90, 150, 200, 100, 100, 0.02);
		// CircleDraw(85, 200, 30, 100, 100, 0.01);

		/*
		if (split_data == "") {
			for (var j = 90; j > 60; j = j - 3) {
				rotate(map(j, 90, 60, 0.05, 0.1));
				//존나 활발함
				//CircleDraw_2(j, 20, 20, 20, 60 - map(j, 90, 60, 1, 80), 0.02 + map(j, 90, 60, 0.005, 0.02), 0.01);
				//CircleDraw_2(j, 255, 180, 190, 100 - map(j, 90, 60, 1, 100), 0.02 + map(j, 90, 60, 0.005, 0.01), 0.005);

			}


		}
		*/

		Listen();
		dataListen();
		Word();

		// 리스닝 중일때
		if (Listening == false) {

			for (var j = 70; j > 40; j = j - 2.5) {
				rotate(map(j, 70, 40, 0.05, 0.01));
				translate(map(j, 70, 40, 1, -4), map(j, 70, 40, 1, 3));
				//존나 활발함
				//CircleDraw_2(j, 255, 255, 255, 100 - map(j, 90, 60, 1, 80), 0.02 + map(j, 90, 60, 0.005, 0.02), 0.01);
				// Translate 써서 기분 좋은 모습 나타내도 좋을듯
				// translate(3, 3)
				CircleDraw_2(j,
					255 - map(j, 70, 40, 1, 30),
					105 + map(j, 70, 40, 1, 80),
					190 - map(j, 70, 40, 1, 40),
					100 - map(j, 70, 40, 1, 100),
					0.02 + map(j, 70, 40, 0.005, 0.005), 0.008);

			}
		}
		// 리스닝 중이 아닌 기본 Idle상태일때
		
		if (Listening == true) {

			for (var j = 90; j > 60; j = j - 2.5) {
				rotate(map(j, 90, 60, 0.01, 0.2));
				translate(-1,1);
				//존나 활발함
				//CircleDraw_2(j, 20, 20, 20, 60 - map(j, 90, 60, 1, 80), 0.02 + map(j, 90, 60, 0.005, 0.02), 0.01);
				CircleDraw_2(j,
					100 + map(j, 90, 60, 1, 155),
					180 + map(j, 90, 60, 1, 70),
					190 + map(j, 90, 60, 1, 60),
					100 - map(j, 90, 60, 1, 100), 0.02 + map(j, 90, 60, 0.005, 0.01), 0.005);
			}
		}
		
		
		

	}

}


function logOn() {
	if (name_Save != null && cardTag == 0) { // 작동
		Speak();
		responsiveVoice.speak(name_Save + "님 반갑습니다", gender);
		logOnSound.play();
		p_class_introduce.style("color", "#222222");
		doSomething(name_Save + "님 반갑습니다!");
		doSomething_2("목소리를 듣고 있습니다.")
		defaultH = 750;
		i = 0;
		access = 1;
		cardTag = 1;
	}
}

function logOut() {
	if (name_Save == null && cardTag == 1) {
		logOutSound.play();
		p_class_introduce.style("color", "#ffffff"); // 기본 컬러 화이트
		doSomething("안녕히가세요!<br> 저를 태그해주세요!");
		name_Save = null;
		doSomething_2("");
		hi = 1000;
		defaultH = 750;
		i = 0;
		access = 0;
		cardTag = 0;
	}
}


function colorTransition(a) {
	while (i < a) {
		i++;
		return i;
	}
	return i;
}

function heightTransition(a) {
	while (hi > a) {
		hi--;
		return hi;
	}
	return hi;
}

function turnOn(goalH) {
	while (defaultH >= goalH) {
		defaultH--;

		return defaultH;
	}
	return defaultH;
}


function keyPressed() {
	if (keyCode == LEFT_ARROW) { // 작동
		gender = "Korean Female";
		logOnSound.play();
		name_Save = "정진균";
		responsiveVoice.speak("정진균님 반갑습니다", gender);
		p_class_introduce.style("color", "#222222");
		doSomething("정진균님 반갑습니다!");
		doSomething_2("목소리를 듣고 있습니다.")
		defaultH = 750;
		i = 0;
		access = 1;
	}
	if (keyCode == RIGHT_ARROW) { // Idle 상태
		/*doSomething(Texts);
		i = 0;
		hi = 1000;
		access = 0;*/
		logOutSound.play();
		name_Save = null;
		p_class_introduce.style("color", "#ffffff"); // 기본 컬러 화이트
		doSomething("안녕히가세요!<br> 저를 태그해주세요!");
		responsiveVoice.speak("정진균님 안녕히가세요!", gender);
		doSomething_2("");
		hi = 1000;
		defaultH = 750;
		i = 0;
		access = 0;
	}
	if (keyCode == DOWN_ARROW) {
		pdf.beginRecord();
		pdf.save();
	}
}


// waveDraw(R, G, B, Opacity, xOff, yOff, mapWidth, mapHeight)
function waveDraw(r, g, b, o, Vx, Vy, maxWidth, maxHeight) {
	fill(r, g, b, o);
	//stroke(0,10);

	beginShape();

	var xoff = 0; // Option #1: 2D Noise

	// Iterate over horizontal pixels
	for (var x = 0; x <= width + 10; x += 10) {
		// X value = Wave frequency control.
		// width + 10 -> because , last point isn't filled.
		// Calculate a y value according to noise, map to 

		// Option #1: 2D Noise
		var y = map(noise(xoff, yoff), 0, 1, maxWidth, maxHeight);

		// Set the vertex
		vertex(x, y);
		// Increment x dimension for noise
		xoff += Vx;
	}
	// increment y dimension for noise
	yoff += Vy;
	vertex(width, height);
	vertex(0, height);
	endShape(CLOSE);
}

// 가운데 인공지능 Orb
function CircleDraw(s, r, g, b, o, xoff, yoff) {

	fill(r, g, b, o);


	var radius = s;
	beginShape();
	var xoff_2 = 0;
	for (var a = 0; a < TWO_PI; a += 0.02) {
		var offset = map(noise(xoff_2, yoff_2), 0, 1, 5, -5);
		var r = radius + offset;
		var x = r * cos(a);
		var y = r * sin(a);
		//vertex(x, y);
		xoff_2 += xoff;
		ellipse(x, y, 1, 1);
	}
	yoff_2 += yoff;
	endShape(CLOSE);

}

function CircleDraw_2(s, r, g, b, o, xoff, yoff) {
	fill(r, g, b, o);
	var radius = s;
	beginShape();
	var xoff_2 = 0;
	for (var a = 0; a < TWO_PI; a += 0.01) {
		var offset = map(noise(xoff_2, yoff_2), 0, 1, 10, -10);
		var r = radius + offset;
		var x = r * cos(a);
		var y = r * sin(a);
		//vertex(x, y);
		xoff_2 += xoff;
		ellipse(x, y, 0.6, 0.6);
	}
	yoff_2 += yoff;
	endShape(CLOSE);

}

function CircleDraw_3(s, r, g, b, o, xoff, yoff) {
	fill(r, g, b, o);
	var radius = s;
	beginShape();
	var xoff_2 = 0;
	for (var a = 0; a < TWO_PI; a += 0.01) {
		var offset = map(noise(xoff_2, yoff_2), 0, 1, 10, -10);
		var r = radius + offset;
		var x = r * cos(a);
		var y = r * sin(a);
		vertex(x, y);
		xoff_2 += xoff;
		//ellipse(x, y, 0.6, 0.6);
	}
	yoff_2 += yoff;
	endShape(CLOSE);

}



// 타이틀 변경해주는 함수
function doSomething(Text) {
	p_class_introduce.html(Text);
}

function doSomething_2(Text) {
	p_class_introduce_2.html(Text);
}

// 브라우저 크기에 맞춰주는 함수
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

// 아두이노와 시리얼 이벤트가 있는지 없는지 검사하는 함수
//function serialEvent() {
//	name = serial.read();
//}

// 넙적한 카드는 정진균, 아닌 카드는 디뜰각으로 저장.
function namesave() {

	// 처음 태그했을 때
	if (name == 50 && cardTag == 0) {
		name_Save = "정진균";
	}
	if (name == 49 && cardTag == 0) {
		name_Save = "홍현수";
	}

	// 두번 태그했을 때
	if (name == 50 && cardTag == 1) {
		name_Save = null;
	}
	if (name == 49 && cardTag == 1) {
		name_Save = null;
	}
}



// 기본적인 부모자식관계 정리하는 함수
function Awake() {
	div_id_contents = createDiv("");
	div_id_section1 = createDiv("");
	p_class_introduce = createP(Texts);
	p_class_introduce.style("color", "#ffffff"); // 기본 컬러 화이트
	p_class_introduce_2 = createP("");
	div_id_contents.id("contents");
	div_id_section1.id("section1");
	p_class_introduce.class("introduce");
	p_class_introduce_2.id("introduce_2");
	div_id_contents.child(div_id_section1);
	div_id_section1.child(p_class_introduce);
	div_id_section1.child(p_class_introduce_2);
	p_class_introduce.changed(doSomething);
	p_class_introduce_2.changed(doSomething_2);
}


/* -------------- 음성인식 관련 Function -------------- */

// 음성인식 후에 Data값 가져오는 함수
function dataListen() {
	annyang.addCallback("result", function (data) {
		if (name_Save != null && Listening == true) {
			data = data[0]
			doSomething_2(data);
			split_data = data.split(" ");
			Listening = false;
			resultSound.play();
		}
	});
}


function Listen() {
	annyang.addCallback("start", function () {
		// console.log("Listen False");
		if (Listening == false) {

			Listening = true;
			// console.log("Listening True");
		}
	});
};


var oData = {
	Name: ["SooYong", "JJIKKYU", "HYUNSOO"],
	종강: ["종강은 영원히 오지 않을껄요", "종강이라뇨! 너무 과분한 생각을 가지고 계시군요."],
	홍현수: ["홍현수 교수님은 정말 대단한 교수님이시죠!"],
	날씨: ["오늘 날씨 너무 좋지 않나요?", "제가 모니터에 갇혀있어서 정확히 모르겠어요.",
		"눈와서 킥보드 못탄다고 정진균이 화내던데 맞나요?"],
	크리스마스: ["미리메리크리스마스!", "산타는 실제로 존재 할까요?"],
	인터랙션: ["코딩 vs 디자인!! 어떤 거 고르실래요?"],
	디자인: ["오.. 디자인 좀 하시나봐요? ^^7"],
	코딩: ["001001 11101 1111111000<br>코딩 좀 하시니까 알아들으실 수 있죠?"],
	안녕: ["안녕하세요. 반갑습니다!", "반가워요!!"],
	이름: ['제 이름은.. "종강이" 예요!', "제 이름 알아서 뭐하시게요!?", "비~밀~"],
	감사: ["이상 발표 마치겠습니다! 한 학기동안 수고하셨습니다"],
	바보: ["이 답변도 정진균 너가 만든 거잖아"],
	학점: ["설마 C를 무서워 하는 거 아니죠? 정진균C"],
	인성: ["원래 인성은 주인 닮는다고 했어요 ㅎㅎ"],
	졸려: ["58674235시간 동안 깨있기 vs 3시간 자기"],
	북치기: ["북치기박치기치기박치기박박치기북치기박치기박치비북ㅂ칩ㄱ븍라막제가시리보다잘하죠?"],
	걱정: ["너무 걱정하지마세요! 우리 아직 젊잖아요?... 아... 나는 아닌가?"],
	미안: ["저한테 왜 갑자기 사과하세요? 괜찮아요."],
	진심: ["저는 항상 한 마디 한 마디가 진심인걸요."],
	맞아: ["모든 걸 알고 있지만 사실 입력해주는 거밖에 몰라요 ㅠ"],
	윤다정: ["안돼안돼"]
}

// 정진균일 때는 여성 음성, 아닐 때는 남성 
function Speak() {
	if (name_Save == "정진균") {
		gender = "Korean Female"
	} else {
		gender = "Korean Male"
	}
}

// 음성을 스플릿한 텍스트에 단어가 있는지 없는지 검사 하는 함수

function Word() {
	if (split_data.indexOf("윤다정") != -1 || split_data.indexOf("다정") != -1) {
		var Result = oData.윤다정[Math.floor(Math.random() * oData.윤다정.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}
	
	
	if (split_data.indexOf("종강") != -1 || split_data.indexOf("종강하고") != -1) {
		var Result = oData.종강[Math.floor(Math.random() * oData.종강.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("안녕") != -1 || split_data.indexOf("반가워") != -1) {
		var Result = oData.안녕[Math.floor(Math.random() * oData.안녕.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("이름") != -1 || split_data.indexOf("이름이") != -1) {
		var Result = oData.이름[Math.floor(Math.random() * oData.이름.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("날씨") != -1) {
		var Result = oData.날씨[Math.floor(Math.random() * oData.날씨.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}

	if (split_data.indexOf("크리스마스") != -1 || split_data.indexOf("크리스") != -1 ||
		split_data.indexOf("메리") != -1) {
		var Result = oData.크리스마스[Math.floor(Math.random() * oData.크리스마스.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("감사") != -1 || split_data.indexOf("감사합니다") != -1 ||
		split_data.indexOf("한학기") != -1) {
		var Result = oData.감사[Math.floor(Math.random() * oData.감사.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("인터랙션") != -1 && split_data.indexOf("디자인") != -1) {
		var Result = oData.인터랙션[Math.floor(Math.random() * oData.인터랙션.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("디자인") != -1) {
		var Result = oData.디자인[Math.floor(Math.random() * oData.디자인.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("코딩") != -1 || split_data.indexOf("고딩") != -1) {
		var Result = oData.코딩[Math.floor(Math.random() * oData.코딩.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";
	}

	if (split_data.indexOf("홍현수") != -1 || split_data.indexOf("교수님") != -1) {
		var Result = oData.홍현수[Math.floor(Math.random() * oData.홍현수.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}

	if (split_data.indexOf("바보") != -1 || split_data.indexOf("멍청이") != -1) {
		var Result = oData.바보[Math.floor(Math.random() * oData.바보.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}

	if (split_data.indexOf("학점") != -1) {
		var Result = oData.학점[Math.floor(Math.random() * oData.학점.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}
	
	if (split_data.indexOf("걱정") != -1 || split_data.indexOf("걱정돼") != -1) {
		var Result = oData.걱정[Math.floor(Math.random() * oData.걱정.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}

	if (split_data.indexOf("인성") != -1 || split_data.indexOf("인성이") != -1) {
		var Result = oData.인성[Math.floor(Math.random() * oData.인성.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}

	if (split_data.indexOf("졸려") != -1 || split_data.indexOf("자고싶어") != -1) {
		var Result = oData.졸려[Math.floor(Math.random() * oData.졸려.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}

	if (split_data.indexOf("랩") != -1 || split_data.indexOf("랩해줘") != -1) {
		var Result = oData.북치기[Math.floor(Math.random() * oData.북치기.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}
	
	if (split_data.indexOf("미안") != -1 || split_data.indexOf("미안해") != -1) {
		var Result = oData.미안[Math.floor(Math.random() * oData.미안.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}
	
	if (split_data.indexOf("진심") != -1 || split_data.indexOf("진심이") != -1) {
		var Result = oData.진심[Math.floor(Math.random() * oData.진심.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}
	
	if (split_data.indexOf("맞아") != -1 || split_data.indexOf("정답") != -1) {
		var Result = oData.맞아[Math.floor(Math.random() * oData.맞아.length)];
		doSomething_2(Result);
		responsiveVoice.speak(Result, gender);
		split_data = "";

	}
}

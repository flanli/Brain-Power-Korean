var intro = new Howl({
	src: ["./audio/brainpower_intro.mp3"],
	loop: false,
	onload: run,
	onend: function () {
		looping = true;
		// reset the tick timer, but advance it one tick
		rate = 1.0005;
		ticks = 1;
		rate_timer = percent_time;
		loop.play();
	}
});

var loop = new Howl({
	src: ["./audio/brainpower_loop.mp3"],
	loop: true
});


var update_time = new Date();
var percent_time = 60 / 173 / 4;

var ticks = 0;

var looping = false;

var rate = 1;
var rate_timer = percent_time;

var lang = "영어";

function change_lang() {
	if (lang === "영어") {
		lang = "일본어";
		document.getElementById("lang_change").innerHTML = lang;
	}
	else if (lang === "일본어") {
		lang = "한국어";
	document.getElementById("lang_change").innerHTML = lang;
	}
	else if (lang === "한국어") {
		lang = "영어"
		document.getElementById("lang_change").innerHTML = lang;
	}
}

function loading(ticks) {
	if (ticks > 40) {
		return 100;
	} else {
		var frac = ticks / 40;
		return (1 - Math.pow(1 - frac, 2)) * 100;
	}
}


function update() {
	document.getElementById("lang_change").innerHTML = lang;
	var new_time = new Date();
	var delta = new_time.getTime() - update_time.getTime();
	update_time.setTime(new_time.getTime());

	rate_timer -= rate * delta / 1000;

	if (rate_timer <= 0) {
		rate_timer += percent_time;
		ticks += 1;
		if (looping) {
			rate += 0.0005;
			loop.rate(rate);
		}
	}

	var fractick = (1 - (rate_timer / percent_time));

	if (looping == false) {
		document.getElementById("brainpower_bg").style.height = 5 * loading(ticks + fractick) + "px";
		document.getElementById("brainpower_bg").style.opacity = (ticks + fractick) / 40;
		document.getElementById("speed").innerHTML = "속도: " + loading(ticks + fractick).toFixed(1) + "%&nbsp;";
	} else {
		if (lang === "영어") {
			document.getElementById("brainpower_text").classList.remove("brainpower_japanese");
			document.getElementById("brainpower_text").classList.remove("brainpower_english");
			document.getElementById("brainpower_text").classList.add("brainpower_korean");
			document.getElementById("brainpower_text").innerHTML = brainpower_korean_text[ticks % 128];
		}
		if (lang === "일본어") {
			document.getElementById("brainpower_text").classList.remove("brainpower_japanese");
			document.getElementById("brainpower_text").classList.remove("brainpower_korean");
			document.getElementById("brainpower_text").classList.add("brainpower_english");
			document.getElementById("brainpower_text").innerHTML = brainpower_english_text[ticks % 128];
		}
		if (lang === "한국어") {
			document.getElementById("brainpower_text").classList.remove("brainpower_english");
			document.getElementById("brainpower_text").classList.remove("brainpower_korean");
			document.getElementById("brainpower_text").classList.add("brainpower_japanese");
			document.getElementById("brainpower_text").innerHTML = brainpower_japanese_text[ticks % 128];
		}
		document.getElementById("speed").innerHTML = "속도: " + (rate * 100).toFixed(1) + "%&nbsp;";
	}

	// background
	if (looping == false && ticks < 40) {
		if (ticks % 4 < 2) {
			var grad = 1 - (ticks % 4 + fractick) / 2;
			var rgb = Math.floor(grad * 128) + 127;
			document.getElementById("brainpower_bg").style.backgroundColor = "rgba(" +
				rgb + "," + rgb + "," + rgb + ", 1)";
		}
		document.getElementById("brainpower_text").style.color = "black";
		document.getElementById("brainpower_text").innerHTML = "로딩";
	} else if (looping == false && ticks < 48) {
		if (ticks % 2 < 1) {
			var grad = 1 - fractick;
			var rgb = Math.floor(grad * 192) + 63;
			document.getElementById("brainpower_bg").style.backgroundColor = "rgba(" +
				rgb + "," + rgb + "," + rgb + ", 1)";
		}
		document.getElementById("brainpower_text").innerHTML = "시작<br>!";
	} else if (looping == false) {
		var grad = 1 - (fractick * 2 - Math.floor(fractick * 2)) / 2;
		var rgb = Math.floor(grad * 255);
		document.getElementById("brainpower_bg").style.backgroundColor = "rgba(" +
			rgb + "," + rgb + "," + rgb + ", 1)";
		document.getElementById("brainpower_text").innerHTML = "시작<br>!";
	} else {
		document.getElementById("brainpower_text").style.top = "0px";
		document.getElementById("brainpower_bg").style.backgroundColor = "black";
		document.getElementById("brainpower_text").style.color = "white";
	}

	var rumble_rate = (rate - 1) * 10;

	var offset_height = getComputedStyle(document.getElementById("brainpower_text")).height;
	if (looping == false && ticks >= 40)
		document.getElementById("brainpower_text").style.top = (rumble_rate - Math.random() * rumble_rate * 2) -
			(parseInt(offset_height.slice(0, offset_height.length - 2)) / 2) + 240 + "px";
	else
		document.getElementById("brainpower_text").style.top = (rumble_rate - Math.random() * rumble_rate * 2) -
			(parseInt(offset_height.slice(0, offset_height.length - 2)) / 2) + 250 + "px";
	document.getElementById("brainpower_text").style.left = (rumble_rate - Math.random() * rumble_rate * 2) + "px";

	requestAnimationFrame(update);
}

function run() {
	update_time = new Date();
	requestAnimationFrame(update);
	intro.play();
}

var brainpower_korean_text = [
	"<span style=\"font-size: 300px;\">오</span>",
	"<span style=\"font-size: 300px;\">오</span>",
	"<span style=\"font-size: 300px;\">오</span>",
	"<span style=\"font-size: 300px;\">오</span>",
	"오",
	"오오",
	"오오오",
	"오오오오",
	"오오오오<br>오",
	"오오오오<br>오오",
	"오오오오<br>오오오",
	"오오오오<br>오오오오",
	"오오오오<br>오오오오<br>오",
	"오오오오<br>오오오오<br>오오",
	"오오오오<br>오오오오<br>오오오",
	"오오오오<br>오오오오<br>오오오오",
	"아",
	"아아",
	"아아아",
	"아아아아",
	"에",
	"에",
	"아　",
	"아　",
	"　아",
	"　아",
	"이　",
	"이　",
	"　아",
	"　아",
	"우",
	"우",
	"<span style=\"font-size: 250px;\">조</span>",
	"<span style=\"font-size: 250px;\">조</span>",
	"<span style=\"font-size: 250px;\">조</span>",
	"<span style=\"font-size: 250px;\">조</span>",
	"오",
	"오오",
	"오오오",
	"오오오오",
	"오오오오<br>오",
	"오오오오<br>오오",
	"오오오오<br>오오오",
	"오오오오<br>오오오오",
	"오오오오<br>오오오오<br>오",
	"오오오오<br>오오오오<br>오오",
	"오오오오<br>오오오오<br>오오오",
	"오오오오<br>오오오오<br>오오오오",
	"아",
	"아아",
	"에",
	"에",
	"오",
	"오",
	"아　",
	"아　",
	"　아",
	"　아",
	"우　",
	"우　",
	"　우",
	"　우",
	"아",
	"아",
	"<span style=\"font-size: 300px;\">에</span>",
	"<span style=\"font-size: 300px;\">에</span>",
	"<span style=\"font-size: 300px;\">에</span>",
	"<span style=\"font-size: 300px;\">에</span>",
	"<span style=\"font-size: 300px;\">에</span>",
	"<span style=\"font-size: 300px;\">에</span>",
	"에",
	"에에",
	"에에에",
	"에에에",
	"에에에<br>에",
	"에에에<br>에에",
	"에에에<br>에에",
	"에에에<br>에에<br>에",
	"에에에<br>에에<br>에에",
	"에에에<br>에에<br>에에에",
	"아",
	"아아",
	"아아아",
	"아아아아",
	"에",
	"에",
	"아　",
	"아　",
	"　에",
	"　에",
	"이　",
	"이　",
	"　에",
	"　에",
	"아",
	"아",
	"<span style=\"font-size: 250px;\">조</span>",
	"<span style=\"font-size: 250px;\">조</span>",
	"<span style=\"font-size: 250px;\">조</span>",
	"<span style=\"font-size: 250px;\">조</span>",
	"오",
	"오오",
	"오오오",
	"오오오",
	"오오오<br>오",
	"오오오<br>오오",
	"오오오<br>오오",
	"오오오<br>오오오",
	"오오오<br>오오오<br>오",
	"오오오<br>오오오<br>오",
	"오오오<br>오오오<br>오오",
	"오오오<br>오오오<br>오오오",
	"에",
	"에에",
	"에에에",
	"에에에에",
	"오",
	"오",
	"아",
	"아",
	"아아",
	"아아아",
	"아아아아",
	"아아아아",
	"아아아아<br>아",
	"아아아아<br>아아",
	"아아아아<br>아아아",
	"아아아아<br>아아아아"
];

var brainpower_english_text = [
	"<span style=\"font-size: 480px;\">O</span>",
	"<span style=\"font-size: 480px;\">O</span>",
	"<span style=\"font-size: 480px;\">O</span>",
	"<span style=\"font-size: 480px;\">O</span>",
	"o",
	"oo",
	"ooo",
	"oooo",
	"oooo<br>o",
	"oooo<br>oo",
	"oooo<br>ooo",
	"oooo<br>oooo",
	"oooo<br>oooo<br>o",
	"oooo<br>oooo<br>oo",
	"oooo<br>oooo<br>ooo",
	"oooo<br>oooo<br>oooo",
	"A",
	"AA",
	"AAA",
	"AAAA",
	"E",
	"E",
	"A&nbsp;",
	"A&nbsp;",
	"&nbsp;A",
	"&nbsp;A",
	"I&nbsp;",
	"I&nbsp;",
	"&nbsp;A",
	"&nbsp;A",
	"U",
	"U",
	"<span style=\"font-size: 480px;\">JO</span>",
	"<span style=\"font-size: 480px;\">JO</span>",
	"<span style=\"font-size: 480px;\">JO</span>",
	"<span style=\"font-size: 480px;\">JO</span>",
	"o",
	"oo",
	"ooo",
	"oooo",
	"oooo<br>o",
	"oooo<br>oo",
	"oooo<br>ooo",
	"oooo<br>oooo",
	"oooo<br>oooo<br>o",
	"oooo<br>oooo<br>oo",
	"oooo<br>oooo<br>ooo",
	"oooo<br>oooo<br>oooo",
	"A",
	"AA",
	"E",
	"E",
	"O",
	"O",
	"A&nbsp;",
	"A&nbsp;",
	"&nbsp;A",
	"&nbsp;A",
	"U&nbsp;",
	"U&nbsp;",
	"&nbsp;U",
	"&nbsp;U",
	"A",
	"A",
	"<span style=\"font-size: 480px;\">E</span>",
	"<span style=\"font-size: 480px;\">E</span>",
	"<span style=\"font-size: 480px;\">E</span>",
	"<span style=\"font-size: 480px;\">E</span>",
	"<span style=\"font-size: 480px;\">E</span>",
	"<span style=\"font-size: 480px;\">E</span>",
	"e",
	"ee",
	"eee",
	"eee",
	"eee<br>e",
	"eee<br>ee",
	"eee<br>ee",
	"eee<br>ee<br>e",
	"eee<br>ee<br>ee",
	"eee<br>ee<br>eee",
	"A",
	"AA",
	"AAA",
	"AAAA",
	"E",
	"E",
	"A&nbsp;",
	"A&nbsp;",
	"&nbsp;E",
	"&nbsp;E",
	"I&nbsp;",
	"I&nbsp;",
	"&nbsp;E",
	"&nbsp;E",
	"A",
	"A",
	"<span style=\"font-size: 480px;\">JO</span>",
	"<span style=\"font-size: 480px;\">JO</span>",
	"<span style=\"font-size: 480px;\">JO</span>",
	"<span style=\"font-size: 480px;\">JO</span>",
	"o",
	"oo",
	"ooo",
	"ooo",
	"ooo<br>o",
	"ooo<br>oo",
	"ooo<br>oo",
	"ooo<br>ooo",
	"ooo<br>ooo<br>o",
	"ooo<br>ooo<br>o",
	"ooo<br>ooo<br>oo",
	"ooo<br>ooo<br>ooo",
	"E",
	"EE",
	"EEE",
	"EEEE",
	"O",
	"O",
	"A",
	"A",
	"AA",
	"AAA",
	"AAAA",
	"AAAA",
	"AAAA<br>A",
	"AAAA<br>AA",
	"AAAA<br>AAA",
	"AAAA<br>AAAA"
];

var brainpower_japanese_text = [
	"<span style=\"font-size: 300px;\">お</span>",
	"<span style=\"font-size: 300px;\">お</span>",
	"<span style=\"font-size: 300px;\">お</span>",
	"<span style=\"font-size: 300px;\">お</span>",
	"お",
	"おお",
	"おおお",
	"おおおお",
	"おおおお<br>お",
	"おおおお<br>おお",
	"おおおお<br>おおお",
	"おおおお<br>おおおお",
	"おおおお<br>おおおお<br>お",
	"おおおお<br>おおおお<br>おお",
	"おおおお<br>おおおお<br>おおお",
	"おおおお<br>おおおお<br>おおおお",
	"あ",
	"ああ",
	"あああ",
	"ああああ",
	"え",
	"え",
	"あ　",
	"あ　",
	"　あ",
	"　あ",
	"い　",
	"い　",
	"　あ",
	"　あ",
	"う",
	"う",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"お",
	"おお",
	"おおお",
	"おおおお",
	"おおおお<br>お",
	"おおおお<br>おお",
	"おおおお<br>おおお",
	"おおおお<br>おおおお",
	"おおおお<br>おおおお<br>お",
	"おおおお<br>おおおお<br>おお",
	"おおおお<br>おおおお<br>おおお",
	"おおおお<br>おおおお<br>おおおお",
	"あ",
	"ああ",
	"え",
	"え",
	"お",
	"お",
	"あ　",
	"あ　",
	"　あ",
	"　あ",
	"う　",
	"う　",
	"　う",
	"　う",
	"あ",
	"あ",
	"<span style=\"font-size: 300px;\">え</span>",
	"<span style=\"font-size: 300px;\">え</span>",
	"<span style=\"font-size: 300px;\">え</span>",
	"<span style=\"font-size: 300px;\">え</span>",
	"<span style=\"font-size: 300px;\">え</span>",
	"<span style=\"font-size: 300px;\">え</span>",
	"え",
	"ええ",
	"えええ",
	"えええ",
	"えええ<br>え",
	"えええ<br>ええ",
	"えええ<br>ええ",
	"えええ<br>ええ<br>え",
	"えええ<br>ええ<br>ええ",
	"えええ<br>ええ<br>えええ",
	"あ",
	"ああ",
	"あああ",
	"ああああ",
	"え",
	"え",
	"あ　",
	"あ　",
	"　え",
	"　え",
	"い　",
	"い　",
	"　え",
	"　え",
	"あ",
	"あ",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"<span style=\"font-size: 250px;\">じょ</span>",
	"お",
	"おお",
	"おおお",
	"おおお",
	"おおお<br>お",
	"おおお<br>おお",
	"おおお<br>おお",
	"おおお<br>おおお",
	"おおお<br>おおお<br>お",
	"おおお<br>おおお<br>お",
	"おおお<br>おおお<br>おお",
	"おおお<br>おおお<br>おおお",
	"え",
	"ええ",
	"えええ",
	"えええ",
	"お",
	"お",
	"あ",
	"あ",
	"ああ",
	"あああ",
	"ああああ",
	"ああああ",
	"ああああ<br>あ",
	"ああああ<br>ああ",
	"ああああ<br>あああ",
	"ああああ<br>ああああ"
];

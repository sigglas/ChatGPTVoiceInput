var lang = "tw";//tw jp
var _continue = false;
var recognition = new webkitSpeechRecognition();
var _content = "";
var showTime = 5;
var recontinue = true;
function Start() {
    var show = document.getElementsByTagName('textarea')[0];
    show.value = "您好，接下來的對話請都使用繁體中文回應。";
    var button = document.getElementsByTagName('button')[1];
    button.click();

    recognition.continuous = true;
    recognition.interimResults = true;
    switch (lang) {
        case "tw":
            recognition.lang = "cmn-Hant-TW";
            break;
        case "jp":
            recognition.lang = "ja-JP";
            break;
        case "us":
            recognition.lang = "en-US";
            break;
    }


    recognition.onstart = function () {
        console.log('開始辨識...');
    };
    recognition.onend = function () {
        if (_continue == false) {
            console.log('停止辨識!');
            if (recontinue) {
                recognition.start();
            }
        }

        else {
            recognition.start();
        }
    };

    lastContent = "";
    recognition.onresult = function (event) {
        showTime = 5;
        var i = event.resultIndex;
        var j = event.results[i].length - 1;
        var cLen = event.results[i][j].transcript.length;
        _content = event.results[i][j].transcript;

        console.log('cLen:' + cLen + ' _content:' + _content);
        console.log('todo : cLen=' + cLen + ' _content.length=' + _content.length);

        show.value = _content;

        //setTimeout(() => {
        //    show.innerHTML = "";
        //}, showTime * 1000);
    };

    _continue = true;
    recognition.start();

    setInterval(() => {
        if (showTime <= 0) {
            button.click();
            show.value = "";
        }
        else
            showTime--;
        console.log(showTime);
    }, 1000);
}
function Stop() {
    _continue = false;
    recognition.stop();
}

setTimeout(() => {
    Start();
}, 5000);
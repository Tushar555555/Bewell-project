var currentscrumbledword = "";
var currentans = "";
var currentindex = "";
var wordDictionay = [];
var countDownDate = 50;
var timer = "";
// var words = ["wonderful", "unmatched", "delivery", "awesome", "delightfull", "cylinder", "painful", "alternate"];

wordDictionay = [
    { question: " What should you avoid with someone who is sick?", key: shuffle("CLOSECONTACT"), value: "CLOSECONTACT" },
    { question: "What should you wash your hands with for atleast 20 seconds, when visibly dirty?", key: shuffle("SOAP"), value: "SOAP" },
    { question: "What should you do, upon return from a COVID-19 affected area?", key: shuffle("SELFQUARANTINE"), value: "SELFQUARANTINE" },
    { question: "This is one of the symptoms of COVID-19", key: shuffle("SORETHROAT"), value: "SORETHROAT" },
    { question: "What cannot prevent Coronavirus?", key: shuffle("ANTIBIOTICS"), value: "ANTIBIOTICS" },
    { question: "What is the minimum distance one must maintain from someone with COVID-19 symptoms?", key: shuffle("THREEFEET"), value: "THREEFEET" },
    { question: "What nature of cough is a symptom of COVID-19?", key: shuffle("DRY"), value: "DRY" },
    { question: "For how many days should one quarantine themselves, in case of symptoms or on return from COVID-19 affected area?", key: shuffle("FOURTEEN"), value: "FOURTEEN" },
    { question: "What should you not do to a mask when using it?", key: shuffle("TOUCH"), value: "TOUCH" },
    { question: "What is a great practice to break the chain of COVID-19?", key: shuffle("SOCIALDISTANCING"), value: "SOCIALDISTANCING" }
]

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}

function shuffle(s) {
    var arr = s.split(''); // Convert String to array
    var n = arr.length; // Length of the array

    for (var i = 0; i < n - 1; ++i) {
        var j = getRandomInt(n); // Get random of [0, n-1]

        var temp = arr[i]; // Swap arr[i] and arr[j]
        arr[i] = arr[j];
        arr[j] = temp;
    }

    s = arr.join(''); // Convert Array to string
    return s; // Return shuffled string
}

function onload() {
    // words.forEach(function(word) {
    //     var w = word.toUpperCase();
    //     wordDictionay.push({
    //         question: "",
    //         key: shuffle(w),
    //         value: w
    //     });

    // });
    LoadGui();
}

function LoadGui() {
    clearBox();
    clearInterval(myTimer);
    disableBtn();

    document.getElementById("answer").innerHTML = "";
    document.getElementById("answer").setAttribute("visibilty", "hidden")
    currentindex = randomKeyFromDict(Object.keys(wordDictionay));
    currentscrumbledword = wordDictionay[currentindex].key;
    currentans = wordDictionay[currentindex].value;
    var count = Object(currentscrumbledword).length;
    document.getElementById("question").innerHTML = wordDictionay[currentindex].question;
    DrawWords(currentscrumbledword, count);
    var textbox = document.getElementById("puzzlesolution");
    textbox.value = "_".repeat(count);
    if (count > 12) {
        textbox.setAttribute('rows', 2);
        textbox.setAttribute('cols', count / 2);
    } else {
        textbox.setAttribute('rows', 1);
        textbox.setAttribute('cols', count);
    }
    countDownDate = 50;
    display = document.querySelector('#timer');
    setTimer();
}

var myTimer;

function setTimer() {
    myTimer = setInterval(myClock, 1000);
    var c = 60;

    function myClock() {
       
        document.getElementById("timer").innerHTML = "00:"+ (--c);
        if (c == 0) {
            clearInterval(myTimer);
            enableBtn();
        }
    }
}

function disableBtn() {
    document.getElementById("next-btn").disabled = true;
}

function enableBtn() {
    document.getElementById("next-btn").disabled = false;
}


function randomKeyFromDict(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function DrawWords(word, wordlength) {
    var input = 0;
    word.split('').forEach(function(c) {
        drawLabel(c, wordlength, input);
        input++;
    });
}

function clearBox() {
    document.getElementById("puzzleword").innerHTML = "";
    document.getElementById("puzzlesolution").value = "";
}

function drawLabel(cha, count, input) {
    var size = count - 3;
    var font = size - 2;
    // document.getElementById("puzzleword").innerHTML = " ";
    $("#puzzleword").append("<input type='button' class='puzzle-char' id='" + cha + input + "' onmousedown= 'charOnClick(this.value,this.id);' value ='" + cha + "'></input>");
}

function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

function getRandomLightColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function charOnClick(chrs, id) {
    // var text = document.getElementById("puzzlesolution").value;
    document.getElementById("puzzlesolution").value = replaceChar(chrs);
    document.getElementById(id).setAttribute("type", "hidden");
    Logic();
}

function replaceChar(replaceChar) {
    var origString = document.getElementById("puzzlesolution").value;
    var index = origString.indexOf("_");
    let firstPart = origString.substr(0, index);

    let lastPart = origString.substr(index + 1);

    let newString =
        firstPart + replaceChar + lastPart;

    return newString;
}

function Logic() {
    var input = document.getElementById("puzzlesolution").value;

    if (input.includes("_")) {
        return;
    }
    if (input.length == currentans.length) {
        if (wordDictionay[currentindex].value == input) {
            Showmessage("Voila!!! Correct Answer Loading New Quiz.")
            changecolorAccordingtoResult(1);
            wordDictionay.pop(currentscrumbledword);
            // LoadGui();
        } else {
            Showmessage("Oops! Wrong Answer Please Try Again")
            wordDictionay.push({
                key: currentscrumbledword,
                value: currentans
            });
            // document.getElementById("puzzlesolution").setAttribute("type", "hidden");
            // document.getElementById("puzzleword").innerHTML = "";
            changecolorAccordingtoResult(0);
            // showAlert("Oops!!", "You Lost Please Click on Button to Start", 'Danger', "down");
        }
    }
    if (Object(wordDictionay).length == 0) {
        // showAlert("Oops!!", "You Win Want to Play Again Pless button", 'success', "up");
    }
}

function CorrectAnsMessage() {


}

function Showmessage(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
}

function showAlert(status, msg, type, thumb) {
    document.getElementById("myAlert").innerHTML = "";
    $("#myAlert").append("<div class='jumbotron jumbotron-fluid bg-" + type + "'>  <div class='container'><h1><i class='fas fa-thumbs-" + thumb + "'></i> " + status + "</h1><p style='padding-left:9%;'>" + msg + "</p></div></div>");
    $("#myAlert").css('visibilty', 'visible');
}

function changecolorAccordingtoResult(colorcode) {
    clearInterval(myTimer);
    enableBtn();
    if (colorcode == 1)
        document.getElementById("puzzlesolution").style.backgroundColor = 'green';
    else {
        document.getElementById("puzzlesolution").style.backgroundColor = 'red';
        document.getElementById("answer").innerHTML = currentans;
        document.getElementById("answer").setAttribute("visibilty", "visible")
    }
}
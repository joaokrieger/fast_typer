$(document).ready(function () {
    startStopwatch();
    initializeCounters();
    $("#btn-restart").click(restartGame);
});

function initializeCounters() {

    $(".typing-field").on("input", function () {
        var content = $(".typing-field").val();
        var numWords = content.split(/\S+/).length - 1;

        $("#word-counter").text(numWords);
        $("#character-counter").text(content.length);

        var arrContent = $(".typing-field").val().split(" ")
        var arrPhrase = $(".phrase").text().split(" ");

        var accuracy = 0;

        for(i = 0; i <= arrContent.length; i++){
            if(arrContent[i] == arrPhrase[i]){
                accuracy++;
            }
        }
        var percentage = (accuracy * 100)/20;

        $("#accuracy-percentage").text(percentage+'%');
    });
}
function startStopwatch(){

    var timeLeft =  $("#typing-time").text();
    $(".typing-field").one("focus",function (){

        $("#btn-restart").attr("disabled", true);

        var stopwatchID = setInterval(function(){
            timeLeft = timeLeft-1;
            $("#typing-time").text(timeLeft);

            if(timeLeft < 1){

                $(".typing-field").attr("disabled", true);
                clearInterval(stopwatchID);
                $("#btn-restart").attr("disabled", false);
                $(".typing-field").addClass("disabled");

                saveScore($("#character-counter").text(), $("#word-counter").text(), $("#accuracy-percentage").text());
            }
        },1000);
    });
}

function restartGame() {
    $(".typing-field").attr("disabled", false);
    $(".typing-field").val('');
    $(".typing-field").removeClass("disabled");
    $("#word-counter").text(0);
    $("#character-counter").text(0);
    $("#typing-time").text(10);
    startStopwatch();
}

function saveScore(characters, words, percentage){

    var play = $('#play-counter').val()
    play++

    score = '<h1></h1>'+
        '<div class="score">'+
        '<p><span>'+play+'#</span></p>'+
        '<p><span>'+characters+'</span> Caracteres</p>'+
        '<p><span>'+words+'</span> Palavras</p>'+
        '<p><span>'+percentage+'</span> de acerto</p>'+
        '</div>';

    $('.player-score').append(score)
    $('#play-counter').val(play)
}


function timerstart(){

    var hour = document.getElementById("hours").value;
    var min = document.getElementById("mins").value;
    var sec = document.getElementById("secs").value;
    var duration = hour*3600 + min*60 + sec;


    var x = setInterval(function(){
        document.getElementById("timer").innerHTML = hour + "" + "Hours" + "  " + min + "" + "Mins" + "  " + sec + "  " + "Seconds";
        sec = sec-1;
        if(sec < 0)
        {
            min = min-1;
            if(min < 0)
            {
                hour = hour -1;
                min = 59;
            }
            sec = 59;
        }


        if (hour < 0 || min <0 || sec <0) {
            clearInterval(x);
            alert("Time Over!!");
          }
        }, 1000);

}

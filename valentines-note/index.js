var yes = false;
var no = false;
AudioElement = new Audio("comeback.mp3");
function sure(){
    console.log("YES");
    yes = true;
    AudioElement.play();
    document.getElementById("Lava").innerHTML = "AWWW";
    document.getElementById("invis").style.opacity="100%";
    document.getElementById("invis2").style.opacity="100%";
}

function nah(){
    console.log("No");
    no = true;
    AudioElement.pause();
    document.getElementById("Lava").innerHTML="Man freak you";
    document.getElementById("invis").style.opacity="0%";
    document.getElementById("invis2").style.opacity="0%";
}

function correct(){
    document.getElementById("answer").innerHTML="YOU are SO SMART";
    document.getElementById("issheright").innerHTML="Top Right Corner";
    
}
function wrong(){
    document.getElementById("answer").innerHTML="yaya KYS buddy.";
}

function closeOverlay(){
    document.getElementById("cover").style.width="0%";
}
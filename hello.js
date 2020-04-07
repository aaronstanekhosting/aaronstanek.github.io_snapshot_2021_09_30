function hello(event) {
    var hello = document.getElementById("hello").getClientRects()[0].top;
    var first = document.getElementById("first").getClientRects()[0].top;
    if (hello >= first) {
        document.getElementById("hello").style.opacity = "0";
    }
    else {
        document.getElementById("hello").style.opacity = "1";
    }
    var thanks = document.getElementById("thanks").getClientRects()[0].bottom;
    var last = document.getElementById("last").getClientRects()[0].bottom;
    if (last > thanks) {
        document.getElementById("thanks").style.opacity = "0";
    }
    else {
        document.getElementById("thanks").style.opacity = "1";
    }
}

function helloStart(callTime) {
    if ((new Date().getTime()) - callTime > 15000) {
        console.log("Timeout on page load. JavaScript will not be used on this page.");
        return;
    }
    if (document.readyState != "complete") {
        setTimeout(helloStart,40,callTime);
    }
    else {
        hello(0);
        window.addEventListener("scroll", hello);
        window.addEventListener("resize", hello);
    }
}

setTimeout(helloStart,0,new Date().getTime());
/* LEFT BAR FUNCTION */
var acc = document.getElementsByClassName("acc-button");
for (var j = 0; j < acc.length; j++) {
    // toggle between showing and hiding the panel (below the specific accordion button) 
    acc[j].addEventListener("click", function () {
        // toggle panel slide 
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight)
            panel.style.maxHeight = null;
        else
            panel.style.maxHeight = panel.scrollHeight + "px";

        // toggle other panel slides if active 
        if (document.getElementById("acc-1").innerHTML === this.innerHTML)
            document.getElementById("acc-2").nextElementSibling.style.maxHeight = null;
        else
            document.getElementById("acc-1").nextElementSibling.style.maxHeight = null;
    });
}




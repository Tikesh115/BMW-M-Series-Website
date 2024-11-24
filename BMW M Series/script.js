document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", reveal);
});

document.getElementById("clickText").addEventListener("click", function() {
    var sound = document.getElementById("sound");
    sound.play();
});

// slideing-transistion-start
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "flex";  
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    showSlides();
}
// slideing-transistion-end

// scroll-reveal-animation

function reveal() {
    var reveals = document.querySelectorAll(".reveal")

    for(var i = 0; i < reveals.length; i++) {
        var revealHeight = window.innerHeight - 150;
        var revealTop = reveals[i].getBoundingClientRect().top;  //will return the top position relative to viewport.
        
        if(revealTop < revealHeight) {
            reveals[i].classList.add("active");
        }
        else {
            reveals[i].classList.remove("active");
        }
    }
}
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

// function reveal() {
//     var reveals = document.querySelectorAll(".reveal")

//     for(var i = 0; i < reveals.length; i++) {
//         var revealHeight = window.innerHeight - 150;
//         var revealTop = reveals[i].getBoundingClientRect().top;  //will return the top position relative to viewport.
        
//         if(revealTop < revealHeight) {
//             reveals[i].classList.add("active");
//         }
//         else {
//             reveals[i].classList.remove("active");
//         }
//     }
// }

// scroll-reveal-animation alternate-version

const sr = ScrollReveal({
    origin: "bottom",
    distance: "40px",
    duration: 800,
    delay: 400,
    easing: "ease-in-out"
});

sr.reveal(".nav img", { delay: 600, origin: "left" });
sr.reveal(".top .car-name", { origin: "right" });
sr.reveal(".skew", {origin: "bottom"});
sr.reveal(".side-view .car", { delay: 600, origin: "right" });
sr.reveal(".side-view .M5-F90", { delay: 900, origin: "bottom"});
sr.reveal(".intro .details h1", { origin: "left"});
sr.reveal(".intro .details h3", { delay: 600, origin: "left"});
sr.reveal(".intro .details p", { delay: 800, origin: "left"});
sr.reveal(".perf", { delay: 400});
sr.reveal(".performance .box h1", { delay: 500,});
sr.reveal(".performance .box img", { delay: 500,});
sr.reveal(".performance .box p", { delay: 700});
sr.reveal(".speed h1", {delay: 400});
sr.reveal(".speed p", {delay: 600});
sr.reveal(".exclusive-luxury .info h1", {delay: 400, origin: "left"});
sr.reveal(".exclusive-luxury .info p", {delay: 600, origin: "left"});
sr.reveal(".exclusive-luxury img", {delay: 400, origin: "right"});
sr.reveal(".articles .title", { delay: 400 });
sr.reveal(".articles img", { delay: 500 });
sr.reveal(".articles h4", { delay: 700, origin: "left" });
sr.reveal(".articles h2", { delay: 900, origin: "left" });
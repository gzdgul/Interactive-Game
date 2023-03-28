// Wrap every letter in a span
const textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
const element_welcome2 = document.getElementById('welcome2');
const element_maindiv = document.getElementById('maindiv');
const element_nameInput = document.getElementById('nameInput');
const element_welcome_back = document.getElementById('welcome_back');
const element_welcome_back_h1 = document.getElementById('welcome_back_h1');
const element_fullAccessButton = document.getElementById('fullAccessButton');

let username = null;

const audio = new Audio("./assets/sound/click.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        audio.play();
    });
});

$(document).ready(function(){

    $("#nameButton").click(function(){
        if (element_nameInput.value) {
            username = element_nameInput.value;
            element_welcome_back_h1.innerText = 'Welcome Back ' + username;
            $("#maindiv").fadeOut(1000);
            setTimeout(() => {
                $("#welcome_back").fadeIn(1000);
            },1000);
            setTimeout(() => {
                $("#welcome_back").fadeOut(1000);
            },3000);
            setTimeout(() => {
                $("#home").fadeIn(1000);
            },4000);
        }
    });

    $("#playDemo").click(function(){
        $("#home").fadeOut(1000);
    });

});

anime.timeline({loop: true})
    .add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1600,
        delay: (el, i) => 500 + 30 * i
    }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
});

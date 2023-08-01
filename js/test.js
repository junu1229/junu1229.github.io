const leftNav = document.querySelector('#leftNav');
const mouseButton = document.querySelector('#mouseButton0');
const cMark = document.querySelector('#cMark');
const leftNav__p = document.querySelector('#leftNav__p p');
const leftNav__p__name1 = document.querySelector('#leftNav__p__name1');
const leftNav__p__name2 = document.querySelector('#leftNav__p__name2');
const container1 = document.querySelector('#container1');
const mouseButton1 = document.querySelector('#mouseButton1');
const rightDot1 = document.querySelector('#rightDot1');
const container2 = document.querySelector('#container2');
const mouseButton2 = document.querySelector('#mouseButton2');
const container3 = document.querySelector('#container3');
const mouseButton3 = document.querySelector('#mouseButton3');
const ballContainer = document.querySelector('#ballContainer');
const aBall = document.querySelector('#aBall');
const rollbar = document.querySelector('#roll1');
const introducemin__h2__1 = document.querySelector('#introducemin__h2__1');
const introducemin__h2__2 = document.querySelector('#introducemin__h2__2');
const introducemin__h2__3 = document.querySelector('#introducemin__h2__3');
const contactme = document.querySelector('#contactme');

// 
leftNav.addEventListener("mouseover", function () {
    cMark.style.transform = "rotateZ(360deg)";
    cMark.style.transition = "all 1.2s";
    leftNav__p.style.transform = "translateX(-5.1rem)";
    leftNav__p.style.fontSize = "1.25rem";
    leftNav__p.style.transition = "all 1.2s";
    leftNav__p__name1.style.transform = "translateX(-5.1rem)";
    leftNav__p__name1.style.transition = "all 1.2s";
    leftNav__p__name2.style.transform = "translateX(-5.1rem)";
    leftNav__p__name2.style.transition = "all 1.2s";
});
leftNav.addEventListener("mouseout", function () {
    cMark.style.transform = "rotateZ(0deg)";
    cMark.style.transition = "all 1.2s";
    leftNav__p.style.transform = "translateX(0)";
    leftNav__p.style.transition = "all 1.2s";
    leftNav__p.style.fontSize = "1.3rem";
    leftNav__p__name1.style.transform = "translateX(0)";
    leftNav__p__name1.style.transition = "all 1.2s";
    leftNav__p__name2.style.transform = "translateX(0)";
    leftNav__p__name2.style.transition = "all 1.2s";
});
aBall.addEventListener("mouseover", function () {
    aBall.style.backgroundColor = "#4B89DC";
    aBall.style.transition = "all 0.7s";
});
aBall.addEventListener("mouseout", function () {
    aBall.style.backgroundColor = "black";
    aBall.style.transition = "all 0.7s";
});
container1.addEventListener("mouseover", function () {
    mouseButton1.style.transform = "translateY(-0.5rem)";
    mouseButton1.style.transition = "0.7s";
});
container1.addEventListener("mouseout", function () {
    mouseButton1.style.transform = "translateY(0)";
    mouseButton1.style.transition = "0.7s";
});
container2.addEventListener("mouseover", function () {
    mouseButton2.style.transform = "translateY(-0.5rem)";
    mouseButton2.style.transition = "0.7s";
});
container2.addEventListener("mouseout", function () {
    mouseButton2.style.transform = "translateY(0)";
    mouseButton2.style.transition = "0.7s";
});
container3.addEventListener("mouseover", function () {
    mouseButton3.style.transform = "translateY(-0.5rem)";
    mouseButton3.style.transition = "0.7s";
});
container3.addEventListener("mouseout", function () {
    mouseButton3.style.transform = "translateY(0)";
    mouseButton3.style.transition = "0.7s";
});
window.addEventListener('scroll', function(){
    // console.log(window.pageXOffset); //deprecated
    // console.log(this.window.scrollY);
    // console.log(this.document.body.offsetHeight)
    // console.log(this.window.innerHeight);
    let width = ((this.window.scrollY/(this.document.body.offsetHeight-this.window.innerHeight))*100);
    let ballContainerwidth = -((this.window.scrollY/(this.document.body.offsetHeight-this.window.innerHeight))*100)+40;
    ballContainer.style.top = ballContainerwidth + "%";
    // console.log(width);
    if(width>=17.5){
        introducemin__h2__1.style.opacity = "100%";
    } else {
        introducemin__h2__1.style.opacity = "0%";
    }
    if(width>=21.8){
        introducemin__h2__2.style.opacity = "100%";
    } else {
        introducemin__h2__2.style.opacity = "0%";
    }
    if(width>=26){
        introducemin__h2__3.style.opacity = "100%";
    } else {
        introducemin__h2__3.style.opacity = "0%";
    }
    if(width>=79.5) {
        contactme.style.opacity = "100%";
        contactme.style.transition = "0.7s";
    } else {
        contactme.style.opacity = "0%";
        contactme.style.transition = "0.7s";
    }
});
const rollbarMatrix = window.getComputedStyle(rollbar).transform;
window.addEventListener('wheel', function(e){
    console.log(e.deltaY);
    const timer = ms => new Promise(res => setTimeout(res, ms))
    let i = 0;
    if(e.deltaY>=0) {
            rollbar.style.transform = "translateX(50%)";
            rollbar.style.transition = "40s linear";
    } else if(e.deltaY<0) {
            rollbar.style.transform = "translateX(-50%)";
            rollbar.style.transition = "40s linear";
    }
})
window.addEventListener('DOMContentLoaded', function(e){
    rollbar.style.transform = "translateX(50%)";
    rollbar.style.transition = "40s linear";
})
const body = document.querySelector('body');
const loadingDiv = document.querySelector('#loading');
const loadingDivPs = document.querySelectorAll('#loading p');
const leftNav = document.querySelector('#leftNav');
const mouseButton = document.querySelector('#mouseButton0');
const cMark = document.querySelector('#cMark');
const leftNav__p = document.querySelector('#leftNav__p p');
const leftNav__p__name1 = document.querySelector('#leftNav__p__name1');
const leftNav__p__name2 = document.querySelector('#leftNav__p__name2');
const timer = ms => new Promise(res => setTimeout(res, ms));
leftNav.addEventListener("mouseover", function () {
    cMark.style.transform = "rotateZ(360deg)";
    cMark.style.transition = "all 1.2s";
    leftNav__p.style.transform = "translateX(-5.1rem)";
    leftNav__p.style.fontSize = "1.25rem";
    leftNav__p.style.transition = "all 1.2s";
    leftNav__p__name1.style.transform = "translateX(-5.1rem)";
    leftNav__p__name1.style.transition = "all 1.2s";
    leftNav__p__name1.style.fontSize = "1.25rem";
    leftNav__p__name2.style.transform = "translateX(-5.1rem)";
    leftNav__p__name2.style.transition = "all 1.2s";
    leftNav__p__name2.style.fontSize = "1.25rem";
});
leftNav.addEventListener("mouseout", function () {
    cMark.style.transform = "rotateZ(0deg)";
    cMark.style.transition = "all 1.2s";
    leftNav__p.style.transform = "translateX(0)";
    leftNav__p.style.transition = "all 1.2s";
    leftNav__p.style.fontSize = "1.3rem";
    leftNav__p__name1.style.transform = "translateX(0)";
    leftNav__p__name1.style.transition = "all 1.2s";
    leftNav__p__name1.style.fontSize = "1.3rem";
    leftNav__p__name2.style.transform = "translateX(0)";
    leftNav__p__name2.style.transition = "all 1.2s";
    leftNav__p__name2.style.fontSize = "1.3rem";
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
window.addEventListener('DOMContentLoaded', function(e){
    loading();
})
async function loading() {
    body.classList.add("stop-scrolling");
    for(var i = 1; i<2; i++) {
        loadingDivPs[i-1].style.visibility = 'visible';
        await timer((700));
        loadingDivPs[i-1].style.visibility = 'hidden';
    }
    loadingDiv.style.transform = "translateY(-100%)";
    loadingDiv.style.borderBottomRightRadius = "37.5% 50%";
    loadingDiv.style.borderBottomLeftRadius = "37.5% 50%";
    loadingDiv.style.transition = "1.0s"
    body.classList.remove("stop-scrolling");
}
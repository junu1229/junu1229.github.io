const body = document.querySelector('body');
const loadingDiv = document.querySelector('#loading');
const loadingDivPs = document.querySelector('#loading p');
const leftNav = document.querySelector('#leftNav');
const mouseButton = document.querySelector('#mouseButton0');
const cMark = document.querySelector('#cMark');
const leftNav__p = document.querySelector('#leftNav__p p');
const leftNav__p__name1 = document.querySelector('#leftNav__p__name1');
const leftNav__p__name2 = document.querySelector('#leftNav__p__name2');
const introducep = document.querySelector('#introduce p');
const dots = document.querySelectorAll('.dot');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const contactme = document.querySelector('#contactme');
const instagram = document.querySelector('#instagram');
const all = document.querySelector('#all');
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
window.onload = function() {
    all.style.display = 'none';
    setTimeout (function() {
        loadingDiv.style.transform = "translateY(0%)";
        scrollTo(0,0);
        body.classList.add("stop-scrolling");
    }, 100);
    loading();
}
const timer = ms => new Promise(res => setTimeout(res, ms));
async function loading() {
    introducep.style.transform = `0rem`;
    loadingDivPs.style.visibility = 'visible';
    await timer((1800));
    loadingDivPs.style.visibility = 'hidden';
    all.style.display = 'block';
    loadingDiv.style.transform = "translateY(-100%)";
    loadingDiv.style.borderBottomRightRadius = "37.5% 50%";
    loadingDiv.style.borderBottomLeftRadius = "37.5% 50%";
    loadingDiv.style.transition = "1.0s";
    body.classList.remove("stop-scrolling");
    dotdot();
}
phone.addEventListener("mouseover", function () {
    phone.style.backgroundColor = "white";
    phone.style.color = "black";
    phone.style.transition = "all 0.7s";
});
phone.addEventListener("mouseout", function () {
    phone.style.backgroundColor = "rgb(28, 29, 32)";
    phone.style.color = "white";
    phone.style.transition = "all 0.7s";
});
email.addEventListener("mouseover", function () {
    email.style.backgroundColor = "white";
    email.style.color = "black";
    email.style.transition = "all 0.7s";
});
email.addEventListener("mouseout", function () {
    email.style.backgroundColor = "rgb(28, 29, 32)";
    email.style.color = "white";
    email.style.transition = "all 0.7s";
});
window.addEventListener('scroll', function(){
    // console.log(window.pageXOffset); //deprecated
    // console.log(this.window.scrollY);
    // console.log(this.document.body.offsetHeight)
    // console.log(this.window.innerHeight);
    let width = ((this.window.scrollY/(this.document.body.offsetHeight-this.window.innerHeight))*100);
    console.log(width);
    if(width>=20.5) {
        introduceph = (width-20.5)*0.5;
        introducep.style.transform = `translateY(${introduceph}rem)`;
    }
    if(width>=82) {
        contactme.style.opacity = "100%";
        contactme.style.transition = "0.7s";
    } else {
        contactme.style.opacity = "0%";
        contactme.style.transition = "0.7s";
    }
});
instagram.addEventListener("mouseover", function () {
    instagram.style.transform = "translateY(-0.5rem)";
    instagram.style.transition = "0.7s";
});
instagram.addEventListener("mouseout", function () {
    instagram.style.transform = "translateY(0)";
    instagram.style.transition = "0.7s";
});
async function dotdot() {
    
    for(let i = 0; i!=-1; i++) {
        for(let j = 0; j<3; j++) {

            await timer((800));
            dots[j].style.visibility = 'visible';
        }
        await timer((800)); 
        dots[0].style.visibility = 'hidden';
        dots[1].style.visibility = 'hidden';
        dots[2].style.visibility = 'hidden';
    }
    
}
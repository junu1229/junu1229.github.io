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
const rollbar2 = document.querySelector('#roll2');
const rollbar3 = document.querySelector('#roll3');
const introducemin__h2__1 = document.querySelector('#introducemin__h2__1');
const introducemin__h2__2 = document.querySelector('#introducemin__h2__2');
const introducemin__h2__3 = document.querySelector('#introducemin__h2__3');
const portfolioBall = document.querySelector('#portfolioBall');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const contactme = document.querySelector('#contactme');
const instagram = document.querySelector('#instagram');
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
aBall.addEventListener("mouseover", function () {
    aBall.style.backgroundColor = "white";
    aBall.style.color = "black";
    aBall.style.transition = "all 0.7s";
    aBall.style.border = "0.5px solid black";
});
aBall.addEventListener("mouseout", function () {
    aBall.style.color = "white";
    aBall.style.border = "none";
    aBall.style.backgroundColor = "black";
    aBall.style.transition = "all 0.7s";
});
portfolioBall.addEventListener("mouseover", function () {
    portfolioBall.style.backgroundColor = "black";
    portfolioBall.style.color = "white";
    portfolioBall.style.transition = "all 0.7s";
});
portfolioBall.addEventListener("mouseout", function () {
    portfolioBall.style.backgroundColor = "white";
    portfolioBall.style.color = "black";
    portfolioBall.style.transition = "all 0.7s";
});
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
instagram.addEventListener("mouseover", function () {
    instagram.style.transform = "translateY(-0.5rem)";
    instagram.style.transition = "0.7s";
});
instagram.addEventListener("mouseout", function () {
    instagram.style.transform = "translateY(0)";
    instagram.style.transition = "0.7s";
});
window.addEventListener('scroll', function(){
    // console.log(window.pageXOffset); //deprecated
    // console.log(this.window.scrollY);
    // console.log(this.document.body.offsetHeight)
    // console.log(this.window.innerHeight);
    let width = ((this.window.scrollY/(this.document.body.offsetHeight-this.window.innerHeight))*100);
    let ballContainerwidth = -((this.window.scrollY/(this.document.body.offsetHeight-this.window.innerHeight))*100)+40;
    ballContainer.style.top = ballContainerwidth + "%";
    console.log(width);
    if(width>=19.3){
        introducemin__h2__1.style.opacity = "100%";
    } else {
        introducemin__h2__1.style.opacity = "0%";
    }
    if(width>=23.2){
        introducemin__h2__2.style.opacity = "100%";
    } else {
        introducemin__h2__2.style.opacity = "0%";
    }
    if(width>=27){
        introducemin__h2__3.style.opacity = "100%";
    } else {
        introducemin__h2__3.style.opacity = "0%";
    }
    if(width>=78.8) {
        contactme.style.opacity = "100%";
        contactme.style.transition = "0.7s";
    } else {
        contactme.style.opacity = "0%";
        contactme.style.transition = "0.7s";
    }
});
let rollstatus = 'rightway';
const timer = ms => new Promise(res => setTimeout(res, ms))
async function right (k) { // We need to wrap the loop into an async function for this to work
    rollstatus = 'rightway';
    for (var j = 0; j < 99999999; j++) {
        let rollvar = getComputedStyle(rollbar);
        let rollvalue = rollvar.getPropertyValue('--rollx');
        let rollcalval = rollvalue.substr(0,rollvalue.length-1);
        rollbar.style.setProperty('--rollx', `${(k+j*0.04)}%`);
        rollbar2.style.setProperty('--rollx', `${(k+j*0.04)}%`);
        rollbar3.style.setProperty('--rollx', `${(k+j*0.04)}%`);
        if(rollcalval>=101.7) {
            rollbar.style.setProperty('--rollx', `0%`);
            j=0;
            k=0;
        }
        if(rollstatus == 'leftway') {
            break;
        }
        await timer(10); // then the created Promise can be awaited
    }
}
async function left (k) { // We need to wrap the loop into an async function for this to work
    rollstatus = 'leftway';
    for (var i = 0; i < 99999999; i++) {
        let rollvar = getComputedStyle(rollbar);
        let rollvalue = rollvar.getPropertyValue('--rollx');
        let rollcalval = rollvalue.substr(0,rollvalue.length-1);
        rollbar.style.setProperty('--rollx', `${k+i*-0.04}%`);
        rollbar2.style.setProperty('--rollx', `${k+i*-0.04}%`);
        rollbar3.style.setProperty('--rollx', `${k+i*-0.04}%`);
        if(rollcalval<=-101.7) {
            rollbar.style.setProperty('--rollx', `0%`);
            i=0;
            k=0;
        }
        if(rollstatus == 'rightway') {
            break;
        }
        await timer(10); // then the created Promise can be awaited
    }
}

const rollbarMatrix = window.getComputedStyle(rollbar).transform;
window.addEventListener('wheel', function(e){
    let rollvark = getComputedStyle(rollbar);
    let rollvaluek = rollvark.getPropertyValue('--rollx');
    let k = rollvaluek.substr(0,rollvaluek.length-1);
    const timer = ms => new Promise(res => setTimeout(res, ms))
    if(e.deltaY>=0&&rollstatus == 'leftway') {
        right(parseFloat(k));
    } else if(e.deltaY<0&&rollstatus == 'rightway') {
        left(parseFloat(k));
    }
})
window.addEventListener('DOMContentLoaded', function(e){
    let rollvark = getComputedStyle(rollbar);
    let rollvaluek = rollvark.getPropertyValue('--rollx');
    let k = rollvaluek.substr(0,rollvaluek.length-1);
    right(parseFloat(k));
})
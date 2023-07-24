const leftNav = document.querySelector('#leftNav');
const mouseButton = document.querySelector('#mouseButton0');
const container1 = document.querySelector('#container1');
const mouseButton1 = document.querySelector('#mouseButton1');
const container2 = document.querySelector('#container2');
const mouseButton2 = document.querySelector('#mouseButton2');
const container3 = document.querySelector('#container3');
const mouseButton3 = document.querySelector('#mouseButton3');
const ballContainer = document.querySelector('#ballContainer');
const aBall = document.querySelector('#aBall');
// 
leftNav.addEventListener("mousemove", function (e) {
    const containerRect = leftNav.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const buttonWidth = mouseButton.offsetWidth;
    const buttonHeight = mouseButton.offsetHeight;
    console.log(buttonWidth);
    console.log(buttonHeight);
    const buttonX = mouseX - buttonWidth / 2;
    const buttonY = mouseY - buttonHeight / 2;

    const maxButtonX = containerRect.width - buttonWidth;
    const maxButtonY = containerRect.height - buttonHeight;
    mouseButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
    mouseButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
    mouseButton.style.transition = "all 0.3s";
});

leftNav.addEventListener("mouseleave", function () {
    setTimeout(function () {
        mouseButton.style.left = "50%";
        mouseButton.style.top = "50%";
        mouseButton.style.transform = "translate(-50%, -50%)";
    }, 50);
});

leftNav.addEventListener("mouseover", function () {
    mouseButton.style.transform = "scale(1.2)";
});
// container1 mouseButton1
container1.addEventListener("mousemove", function (e) {
    const containerRect = container1.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const buttonWidth = mouseButton1.offsetWidth;
    const buttonHeight = mouseButton1.offsetHeight;
    const buttonX = mouseX - buttonWidth / 2;
    const buttonY = mouseY - buttonHeight / 2;

    const maxButtonX = containerRect.width - buttonWidth;
    const maxButtonY = containerRect.height - buttonHeight;
    mouseButton1.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
    mouseButton1.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
    mouseButton1.style.transition = "all 0.3s";
});

container1.addEventListener("mouseleave", function () {
    setTimeout(function () {
        mouseButton1.style.left = "50%";
        mouseButton1.style.top = "50%";
        mouseButton1.style.transform = "translate(-50%, -50%)";
    }, 50);
});

container1.addEventListener("mouseover", function () {
    mouseButton1.style.transform = "scale(1.2)";
});
// container2 mouseButton2
container2.addEventListener("mousemove", function (e) {
    const containerRect = container2.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const buttonWidth = mouseButton2.offsetWidth;
    const buttonHeight = mouseButton2.offsetHeight;
    const buttonX = mouseX - buttonWidth / 2;
    const buttonY = mouseY - buttonHeight / 2;

    const maxButtonX = containerRect.width - buttonWidth;
    const maxButtonY = containerRect.height - buttonHeight;
    mouseButton2.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
    mouseButton2.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
    mouseButton2.style.transition = "all 0.3s";
});

container2.addEventListener("mouseleave", function () {
    setTimeout(function () {
        mouseButton2.style.left = "50%";
        mouseButton2.style.top = "50%";
        mouseButton2.style.transform = "translate(-50%, -50%)";
    }, 50);
});

container2.addEventListener("mouseover", function () {
    mouseButton2.style.transform = "scale(1.2)";
});
// container3 mouseButton3
container3.addEventListener("mousemove", function (e) {
    const containerRect = container3.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const buttonWidth = mouseButton3.offsetWidth;
    const buttonHeight = mouseButton3.offsetHeight;
    const buttonX = mouseX - buttonWidth / 2;
    const buttonY = mouseY - buttonHeight / 2;

    const maxButtonX = containerRect.width - buttonWidth;
    const maxButtonY = containerRect.height - buttonHeight;
    mouseButton3.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
    mouseButton3.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
    mouseButton3.style.transition = "all 0.3s";
});

container3.addEventListener("mouseleave", function () {
    setTimeout(function () {
        mouseButton3.style.left = "50%";
        mouseButton3.style.top = "50%";
        mouseButton3.style.transform = "translate(-50%, -50%)";
    }, 50);
});

container3.addEventListener("mouseover", function () {
    mouseButton3.style.transform = "scale(1.2)";
});
// ballContainer aBall
ballContainer.addEventListener("mousemove", function (e) {
    const containerRect = ballContainer.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const buttonWidth = aBall.offsetWidth;
    const buttonHeight = aBall.offsetHeight;
    const buttonX = mouseX - buttonWidth / 2;
    const buttonY = mouseY - buttonHeight / 2;

    const maxButtonX = containerRect.width - buttonWidth;
    const maxButtonY = containerRect.height - buttonHeight;
    aBall.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
    aBall.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
    aBall.style.transition = "all 0.3s";
});

ballContainer.addEventListener("mouseleave", function () {
    setTimeout(function () {
        aBall.style.left = "50%";
        aBall.style.top = "50%";
        aBall.style.transform = "translate(-50%, -50%)";
    }, 50);
});

ballContainer.addEventListener("mouseover", function () {
    aBall.style.transform = "scale(1.2)";
});
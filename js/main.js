// check if we have color in local storage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll("colors-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === mainColors) {
      e.classList.add("active");
    }
  });
}

let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.getElementById("yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
// Toggle spin class on icon
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //set color to local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// switch Random Background option
const randomBackgrounds = document.querySelectorAll(".random-backgrounds span");

randomBackgrounds.forEach((span) => {
  span.addEventListener("click", (e) => {
    // remove active class from all children
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      localStorage.setItem("background_option", backgroundOption);
      randmizeImages();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", backgroundOption);
    }
  });
});

// change landing page background randomly

let landingPage = document.querySelector(".landing-page");
let imgArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

function randmizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = `url(img/${imgArray[randomNumber]})`;
    }, 5000);
  }
}

///// skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  if (this.scrollY > 650) {
    let allSkills = document.querySelectorAll(
      ".skills-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// start gallery
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let heading = document.createElement("h2");
      heading.appendChild(document.createTextNode(img.alt));
      popupBox.appendChild(heading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // create closing span
    let closeButton = document.createElement("span");
    closeButton.appendChild(document.createTextNode("X"));
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// start nav bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allBullets);
scrollTo(allLinks);

// handle Active State

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// bullets option

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletlocalExist = localStorage.getItem("bullets_option");

if (bulletlocalExist !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletlocalExist === "show") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", span.dataset.display);
    } else {
      localStorage.setItem("bullets_option", span.dataset.display);

      bulletsContainer.style.display = "none";
    }
    handleActive(e);
  });
});

// reset options
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// Click any Where outside menu and toggle button
document.body.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    tLinks.classList.remove("open");
    toggleBtn.classList.remove("menu-active");
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};

let inputs = document.querySelectorAll(".left input");
function checkForm() {
  let btn = document.getElementById("submit");
  let form = document.querySelector("form");
  btn.onclick = function (form) {
    inputs.forEach((e) => {
      if (e.value === "") {
        form.preventDefault();
      }
    });
  };
}
checkForm();

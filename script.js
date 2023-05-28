"use strict";

//masonry 레이아웃
function imagesInit() {
  const images = document.querySelectorAll(".Look__image");
  if (images.length) {
    images.forEach((image) => {
      const imageItem = image.querySelector("img");
      const padding = (imageItem.offsetHeight / imageItem.offsetWidth) * 100;
      console.log(imageItem);
      console.log(imageItem.offsetHeight);
      console.log(imageItem.offsetWidth);

      image.style.paddingBottom = `${padding}%`;
      imageItem.classList.add("init");
    });
  }
}

function imagesInit2() {
  const images = document.querySelectorAll(".Look__image_zzim");
  if (images.length) {
    images.forEach((image) => {
      const imageItem = image.querySelector("img");
      imageItem.addEventListener("load", () => {
        const padding = (imageItem.offsetHeight / imageItem.offsetWidth) * 100;
        image.style.margin = 10;
        image.style.paddingBottom = `${padding}%`;
        imageItem.classList.add("init");
      });
    });
  }
}

function gridInit() {
  const items = document.querySelector(".Looks__items");
  const itemsGrid = new Isotope(items, {
    itemSelector: ".Look",
    masonry: {
      fitWidth: true,
      gutter: 20,
    },
  });

  document.addEventListener("click", documentActions);

  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest(".filter-Looks__item")) {
      const filterItem = targetElement.closest(".filter-Looks__item");
      const filterValue = filterItem.dataset.filter;
      const filterActiveItem = document.querySelector(
        ".filter-Looks__item.active"
      );

      filterValue === "*"
        ? itemsGrid.arrange({ filter: `` })
        : itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });

      filterActiveItem.classList.remove("active");
      filterItem.classList.add("active");

      e.preventDefault();
    }
  }
}

function gridInit2() {
  const items = document.querySelector(".Looks__items_zzim");
  const itemsGrid = new Isotope(items, {
    itemSelector: ".Look",
    layoutMode: "masonry",
    percentPosition: true,
    masonry: {
      fitWidth: true,
      gutter: 20,
    },
  });

  imagesLoaded(items).on("progress", function () {
    itemsGrid.layout();
  });
}

/*크게 보기*/

var lookImages = document.querySelectorAll(".Look__image");

lookImages.forEach(function (lookImage) {
  lookImage.addEventListener("click", function () {
    var imageSource = this.querySelector("img").getAttribute("src");

    document.querySelector(".popup-image").style.display = "block";
    document.querySelector(".popup-image img").src = imageSource;
  });
});
document.querySelector(".popup-image span").onclick = () => {
  document.querySelector(".popup-image").style.display = "none";
};

function LookBigZzim() {
  var lookImages2 = document.querySelectorAll(".Look__image_zzim");

  lookImages2.forEach(function (lookImage) {
    lookImage.addEventListener("click", function () {
      var imageSource = this.querySelector("img").getAttribute("src");
      document.querySelector(".popup-image").style.display = "block";
      document.querySelector(".popup-image img").src = imageSource;
    });
  });

  document.querySelector(".popup-image span").onclick = () => {
    document.querySelector(".popup-image").style.display = "none";
  };
}

//하트 채우고 찜 배열에 넣기

// 페이지 로드 시 로컬 스토리지에서 arr 배열 불러오기

var arr = []; // 초기 배열

function toggleHeart(event, imageSrc) {
  var clickedHeart = event.target;
  var imageIndex = arr.indexOf(imageSrc);

  if (clickedHeart.src.endsWith("heart.png")) {
    clickedHeart.src = "img/heart-fill.png";
    if (imageIndex === -1) {
      //해당 이미지가 배열에 없으면
      arr.push(imageSrc); // 배열에 이미지 추가
    }
  } else if (clickedHeart.src.endsWith("heart-fill.png")) {
    clickedHeart.src = "img/heart.png";
    if (imageIndex !== -1) {
      arr.splice(imageIndex, 1); // 배열에서 이미지 제거
    }
  }
  saveArrToLocalStorage();
  console.log(arr);
}

// arr 배열 로컬 스토리지에 저장하기
function saveArrToLocalStorage() {
  localStorage.setItem("imageArray", JSON.stringify(arr));
}

// 로컬 스토리지에서 arr 배열을 불러오기
function loadArrFromLocalStorage() {
  var imageArray = localStorage.getItem("imageArray");
  if (imageArray) {
    arr = JSON.parse(imageArray);
  }
}

//찜 화면에  하트 상태 적용하기
function loadHeartStatus() {
  var buttons = document.querySelectorAll(".zzim_button");

  buttons.forEach(function (button) {
    var imageSrc = button.parentNode.parentNode.querySelector("img").src;
    //console.log(imageSrc);
    var imageName = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);
    //console.log(imageName);
    if (arr.includes("img/" + imageName)) {
      console.log("a");
      button.querySelector("img").src = "img/heart-fill.png";
    } else {
      console.log("b");
      button.querySelector("img").src = "img/heart.png";
    }
  });
}

// 찜 화면 이미지 HTML에 그리기

function addImagesToHTML() {
  var container = document.querySelector(".Looks__items_zzim"); // 이미지를 추가할 컨테이너 요소

  for (var i = 0; i < arr.length; i++) {
    var imageSrc = arr[i];

    // Look 요소 생성
    var look = document.createElement("Look");
    look.className = "Looks__item Look";
    //look.setAttribute("data-filter", "clear");

    // 이미지를 감싸는 <a> 요소 생성
    var link = document.createElement("a");
    link.href = "#";
    link.className = "Look__image_zzim";

    // 이미지 요소 생성
    var image = document.createElement("img");
    image.src = imageSrc;
    image.alt = "Image";
    link.appendChild(image);

    // hover_text 요소 생성
    var hoverText = document.createElement("div");
    hoverText.className = "hover_text";
    hoverText.textContent = "크게 보기";
    link.appendChild(hoverText);

    look.appendChild(link);

    // zzim 요소 생성
    var zzim = document.createElement("div");
    zzim.className = "zzim";

    // 하트 버튼 생성
    var heartButton = document.createElement("button");
    heartButton.className = "zzim_button";
    heartButton.type = "button";

    // 하트 이미지 생성
    var heartImage = document.createElement("img");
    heartImage.src = "img/heart-fill.png";
    heartImage.alt = "Heart";
    heartImage.onclick = function (event) {
      toggleHeart(event, imageSrc);
    };

    heartButton.appendChild(heartImage);
    zzim.appendChild(heartButton);
    look.appendChild(zzim);

    container.appendChild(look);
  }
}

//화면 로드 이후에
window.addEventListener("load", function () {
  loadArrFromLocalStorage(); // 로컬 스토리지에서 arr 배열 불러오기
  loadHeartStatus(); // 하트 상태 적용하기
  imagesInit();
  gridInit();

  addImagesToHTML();
  imagesInit2();
  gridInit2();

  LookBigZzim();
});

const CLIENT_ID = "2pWl7-TpYiOG_JLrRElAF-1zHW-9UlPuXJh0XgDeHek";
const slider = document.getElementById("img-api");
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const cross = document.querySelector(".cross");

// Api запрос обработка

let url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=27&query=mountains`;

async function randomPhoto() {
  const response = await fetch(url);
  const data = await response.json();

  slider.innerHTML = data
    .map(({ urls: { small, raw } }) => {
      return `<a href="${raw}"><div class="class-img"  style="background-image: url(${small})"></div></a>
             `;
    })
    .join("");
}

search.addEventListener("click", function () {
  url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=9&query=${input.value}`;
  randomPhoto();
});

randomPhoto();

// Поиск по Enter

input.addEventListener("keypress", function (e) {
  if (e.which === 13) {
    url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=9&query=${input.value}`;
    randomPhoto();
  }
});

// крестик на поиске

document.addEventListener("mouseup", function (e) {
  let container = document.querySelector("input");
  if (!container.contains(e.target) && input.value == "") {
    cross.classList.add("hidden");
  }
});

function crossUnhide() {
  if (input.value == "") {
    cross.classList.remove("hidden");
  }
}
function crossHide() {
  if (input.value !== "") {
    cross.classList.add("hidden");
    input.value = "";
  } else {
    cross.classList.remove("hidden");
  }
}
function crossHideside() {
  if (input.value == "") {
    cross.classList.add("hidden");
  }
}

input.addEventListener("click", crossUnhide);
cross.addEventListener("click", crossHide);

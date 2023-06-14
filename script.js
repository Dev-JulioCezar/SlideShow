"use strict";

const imagens = [
  { id: "Akali", url: "./img/Akali.jpg" },
  { id: "Caitlyn", url: "./img/Caitlyn.jpg" },
  { id: "Heimerdinger", url: "./img/Heimerdinger.jpg" },
  { id: "Karma", url: "./img/Karma.jpg" },
  { id: "Shaco", url: "./img/Shaco.jpg" },
  { id: "Yuumi", url: "./img/Yuumi.jpg" },
];

const container = document.querySelector("#container-items");

const load = (img, conteudo) => {
  img.forEach((item) => {
    conteudo.innerHTML += `
    <div class='item'>
        <img src='${item.url}' id='${item.id}'
    </div>
    `;
  });
};
load(imagens, container);

let items = document.querySelectorAll(".item");
let imgs = document.querySelectorAll(".item img");
const fundo = document.getElementById("fundo");

const checked = (item) => {
  const itemID = item[1].id;
  const radio = document.querySelector(`input[id="${itemID}"]`);
  if (radio) {
    radio.checked = true;
  }
};

const next = () => {
  container.appendChild(items[0]);
  items = document.querySelectorAll(".item");
  imgs = document.querySelectorAll(".item img");
  const imgSrc = imgs[1].src.replace(/^(?:\/\/|[^/]+)*\//, "");
  fundo.style.backgroundImage = `url(../${imgSrc})`;

  checked(imgs);
};

const previous = () => {
  const lastItem = items[items.length - 1];
  container.insertBefore(lastItem, items[0]);
  items = document.querySelectorAll(".item");
  imgs = document.querySelectorAll(".item img");
  const imgSrc = imgs[1].src.replace(/^(?:\/\/|[^/]+)*\//, "");
  fundo.style.backgroundImage = `url(../${imgSrc})`;

  checked(imgs);
};
previous();

document.querySelector("#previous").addEventListener("click", previous);
document.querySelector("#next").addEventListener("click", next);

//..........................................................
const radios = document.querySelectorAll('input[type="radio"]');

const checkedFundo = (item) => {
  const radioId = item.target.id;
  const url = `url(../img/${radioId}.jpg)`;
  fundo.style.backgroundImage = url;
  do {
    next();
  } while (imgs[1].id !== radioId);
};

radios.forEach((item) => {
  item.addEventListener("change", checkedFundo);
});

//-------------------------------------------------------------
const buttons = document.querySelectorAll("#buttons button");
let interval;
const auto = (item) =>
  interval = setInterval((n) => {
    n = item;
    n();
  }, 2000);

const start = (btn) => {
  const btnID = btn.target.id;
  if (btnID === "right") {
    next();
    clearInterval(interval)
    auto(next);
  } else if (btnID === "left"){
    previous()
    clearInterval(interval)
    auto(previous)
  } else if (btnID === "pause") {
    clearInterval(interval)
  }
};

buttons.forEach((btn) => {
  btn.addEventListener("click", start);
});

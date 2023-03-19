import { datosVideos } from "./data.js";
const datosGuardados = JSON.parse(localStorage.getItem("datosVideos")) || [];
console.log(datosGuardados);

const containerVideos = document.querySelector(".main__videos");

const printVideos = (container, videoList) => {
  container.innerHTML = "";
  videoList.forEach((video) => {
    container.innerHTML += `
    <article class="videos" name=${video.id} data-video='video' >
    <figure class="video__figure">
        <img src="${video.thumbnail}" data-video='video' name=${video.id} id="${video.category}">
        <span  data-video='video'>${video.duration}</span>
    </figure>
    <section class="video__description"  data-video='video'>
        <figure class="video__thumbail" data-video='video'>
            <img src="${video.logo}">
        </figure>
    <section class="video__info"  data-video='video'>
    
        <h1>${video.titulo}</h1>
        <p>${video.creador}</p>
        <p>${video.visitas} - ${video.fecha_subida}</p>
    </section>
    </section>
    </article>
    
    `;
  });
};

//-----------------------Filtrado---------------------
//1. Creamos un array con las categorías de los personajes

const categories = ["all"];

datosGuardados.forEach((item) => {
  if (!categories.includes(item.category)) {
    categories.push(item.category);
  }
  console.log(categories);
});

categories.forEach((item) => {
  const botonFiltrado = document.getElementsByName(item)[0];
  console.log(botonFiltrado);

  botonFiltrado.addEventListener("click", () => {
    const videosFiltrados =
      item === "all"
        ? datosGuardados
        : datosGuardados.filter((element) => element.category === item);
    printVideos(containerVideos, videosFiltrados);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("datosVideos", JSON.stringify(datosVideos));
  printVideos(containerVideos, datosGuardados);
});

document.addEventListener("click", (event) => {
  const videoAttribute = event.target.getAttribute("data-video");

  if (videoAttribute === "video") {
    const id = event.target.getAttribute("name");
    const categoryVid = event.target.getAttribute("id");
    sessionStorage.setItem("category", JSON.stringify(categoryVid));
    sessionStorage.setItem("id", JSON.stringify(id));
    window.location.href = "./pages/video.html";
  }
});

const subir = document.querySelector(".subir__video");

subir.addEventListener("click", () => {
  window.location.href = "/pages/subir.html";
});

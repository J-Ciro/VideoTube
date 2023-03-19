import { datosVideos } from "./data.js";

const logo = document.querySelector(".header__figure ");

logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const idVideoJ = JSON.parse(sessionStorage.getItem("id")) || 0;
const idVideo = Number(idVideoJ);

const cateHolder = JSON.parse(sessionStorage.getItem("category"));

const video = datosVideos.find((vid) => vid.id === idVideo);
const infoVideo = document.getElementById("main__video");
const recoVideo = document.getElementById("main__videos");
//Le vamos a agregar el contenido deseado: 1. Imagen del personaje

const showVideo = (contenedor, video) => {
  const seccionVideo = document.createElement("section");
  seccionVideo.classList.add("main_tests");
  seccionVideo.innerHTML = `
  <iframe width="929" height="477" src="${video.url}" title="${video.titulo}" class="frame__video" frameborder="0" allow="autoplay" allow="accelerometer"; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <section class="video__rep">
   <figure class="video__thumbail" data-video='video'>
            <img src="${video.logo}">
        </figure>
    <section id="video__info"  data-video='video'>
      <h1>${video.titulo}</h1>
      <p>${video.creador}</p>
      <p>${video.visitas} - ${video.fecha_subida}</p>
    </section>
  </section>
  
  `;
  console.log(seccionVideo);
  contenedor.appendChild(seccionVideo);
};

const datosGuardados = JSON.parse(localStorage.getItem("datosVideos")) || [];
const videosRecomendados = (contenedor) => {
  let recomendados = datosGuardados.filter(
    (videos) => videos.id != idVideo && videos.category === cateHolder
  );
  const seccionRecomendados = document.createElement("section");
  seccionRecomendados.classList.add("seccion__recom");
  seccionRecomendados.innerHTML = "";

  recomendados.forEach((vids) => {
    seccionRecomendados.innerHTML += `
    
  <section class="video__description" >
    <figure class="video__figure">
      <img src="${vids.thumbnail}" data-video='video' name=${vids.id} id="${vids.category}">
      <span  data-video='video'>${vids.duration}</span>
    </figure>

    <section class="video__info"  data-video='video'>
  
      <h1>${vids.titulo}</h1>
      <p>${vids.creador}</p>
      <p>${vids.visitas} - ${vids.fecha_subida}</p>
    </section>
  </section>
  `;
  });
  contenedor.appendChild(seccionRecomendados);
};

document.addEventListener("DOMContentLoaded", () => {
  //Capturar la información que tenemos guardada en el session storage
  showVideo(infoVideo, video);

  videosRecomendados(recoVideo);
  // Iterar sobre el array de videos y mostrarlos en el contenedor
});

document.addEventListener("click", (event) => {
  const videoAttribute = event.target.getAttribute("data-video");
  console.log("Hice Click", event.target);
  if (videoAttribute === "video") {
    const id = event.target.getAttribute("name");
    const categoryVid = event.target.getAttribute("id");
    sessionStorage.setItem("category", JSON.stringify(categoryVid));
    sessionStorage.setItem("id", JSON.stringify(id));
    window.location.href = "./video.html";
  }
});

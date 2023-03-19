// Obtener datos del almacenamiento local o crear un array vacío

const datosGuardados = JSON.parse(localStorage.getItem("datosVideos")) || [];

const regresar = document.querySelector(".header__figure");

regresar.addEventListener("click", () => {
  window.location.href = "../index.html";
});

function datos() {
  const lastItem = datosGuardados[datosGuardados.length - 1];
  const id = lastItem ? lastItem.id + 1 : 1;
  let select = document.querySelector("#categorias");
  let categoria = select.value;
  let creador = document.getElementById("creador_video").value;
  let logo = document.getElementById("logo_canal").value;
  let titulo = document.getElementById("titulo_video").value;
  let duracion = document.getElementById("duracion_video").value;
  let miniatura = document.getElementById("thumbnail_video").value;
  let url = document.getElementById("url_video").value;
  let visitas = Math.floor(Math.random() * 1000000) + " visitas";
  let fecha_subida = new Date().toDateString();

  const regex = /^\s*$|^\s+/;
  const formInputs = form.querySelectorAll("input, select");
  let i = 0;

  while (i < formInputs.length) {
    if (regex.test(formInputs[i].value)) {
      alert("Por favor, llene todos los campos del formulario");
      return; // Si hay campos vacíos, no se guarda nada en el array
    }
    i++;
  }
  datosGuardados.push({
    id: id,
    category: `${categoria}`,
    creador: `${creador}`,
    logo: `${logo}`,
    titulo: `${titulo}`,
    duration: `${duracion}`,
    thumbnail: `${miniatura}`,
    url: `${url}`,
    visitas: `${visitas}`,
    fecha_subida: `${fecha_subida}`,
  });

  // Guardar el array actualizado en el almacenamiento local

  console.log(datosGuardados);
}

const subir = document.querySelector(".datos");

subir.addEventListener("click", () => {
  localStorage.setItem("datosVideos", JSON.stringify(datosGuardados));
  datos();
});

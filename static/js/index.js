// index.js - para index.html

// La variable API_URL se define en el HTML: <script>const API_URL = "{{ url_for('get_data') }}";</script>

let dataGlobal = [];
let filtros = {
  institucion: "",
  modalidad: "",
  regimen: "",
  carrera: "",
  areaDeEstudio: "",
};

// Mapeo de IDs de los selects a las claves del filtro
const idToFilterKey = {
  institucion: "institucion",
  modalidad: "modalidad",
  regimen: "regimen",
  carrera: "carrera",
  "area-de-estudio": "areaDeEstudio",
};

// Función principal para cargar los datos desde Flask
async function cargarOpciones() {
  try {
    const response = await fetch(API_URL);
    dataGlobal = await response.json();
    actualizarOpciones();
  } catch (error) {
    console.error("Error al cargar opciones:", error);
  }
}

// Actualiza los selects según los filtros actuales
function actualizarOpciones() {
  const filtrado = dataGlobal.filter(item =>
    (filtros.institucion === "" || item.Institucion === filtros.institucion) &&
    (filtros.modalidad === "" || item.Modalidad === filtros.modalidad) &&
    (filtros.regimen === "" || item.Regimen === filtros.regimen) &&
    (filtros.carrera === "" || item.Carrera === filtros.carrera) &&
    (filtros.areaDeEstudio === "" || item.AreaDeEducacion === filtros.areaDeEstudio)
  );

  // Crear listas únicas de opciones
  llenarSelect("institucion", [...new Set(filtrado.map(i => i.Institucion))], "Institución", filtros.institucion);
  llenarSelect("modalidad", [...new Set(filtrado.map(i => i.Modalidad))], "Modalidad", filtros.modalidad);
  llenarSelect("regimen", [...new Set(filtrado.map(i => i.Regimen))], "Régimen", filtros.regimen);
  llenarSelect("carrera", [...new Set(filtrado.map(i => i.Carrera))], "Carrera", filtros.carrera);
  llenarSelect("area-de-estudio", [...new Set(filtrado.map(i => i.AreaDeEducacion))], "Área de Estudio", filtros.areaDeEstudio);
}

// Llena un select con opciones
function llenarSelect(id, opciones, textoPredeterminado, seleccionActual) {
  const select = document.getElementById(id);
  select.innerHTML = "";

  const opt = document.createElement("option");
  opt.value = "";
  opt.textContent = textoPredeterminado;
  opt.disabled = true;
  opt.selected = !seleccionActual;
  select.appendChild(opt);

  opciones.forEach(opcion => {
    const option = document.createElement("option");
    option.value = opcion;
    option.textContent = opcion;
    if (opcion === seleccionActual) option.selected = true;
    select.appendChild(option);
  });
}

// Escucha cambios en los selects
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", (e) => {
    const key = idToFilterKey[e.target.id];
    if (key) {
      filtros[key] = e.target.value;
      actualizarOpciones();
    }
  });
});

// Guardar filtros en localStorage y redirigir a resultados
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  Object.keys(filtros).forEach(k => localStorage.setItem(k, filtros[k]));
  window.location.href = "/resultados";  // Ahora usa ruta Flask
});

// Inicializar
cargarOpciones();

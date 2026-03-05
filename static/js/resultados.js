// resultados.js - para resultados.html

// API_URL se define en el HTML: <script>const API_URL = "{{ url_for('get_data') }}";</script>

function agregarEstiloSeleccionado() {
  const style = document.createElement("style");
  style.textContent = `
    .fila-seleccionada {
      background-color: #f0f8ff;
      color: #051b43;
    }
    .fila-seleccionada:hover {
      background-color: #051b43;
      color: #fff;
    }
  `;
  document.head.appendChild(style);
}

// Recuperar filtros desde localStorage
const filtros = {
  institucion: localStorage.getItem("institucion") || "",
  areaDeEducacion: localStorage.getItem("areaDeEducacion") || "",
  modalidad: localStorage.getItem("modalidad") || "",
  regimen: localStorage.getItem("regimen") || "",
  carrera: localStorage.getItem("carrera") || "",
};

// Configura clics en las filas
function configurarEventosClickEnTabla() {
  document.querySelectorAll("#tabla-resultados tr").forEach(fila => {
    fila.addEventListener("click", () => {
      const arancelReferencia = parseInt(fila.getAttribute("data-arancel-referencia")) || 0;
      const duracion = parseInt(fila.getAttribute("data-duracion")) || 0;
      const carreraSeleccionada = fila.querySelector("td:nth-child(2)")?.textContent || "N/A";

      const event = new CustomEvent("filaSeleccionada", { detail: { arancelReferencia, duracion, carreraSeleccionada, filaSeleccionada: fila } });
      document.dispatchEvent(event);
    });
  });
}

// Cargar y mostrar resultados filtrados
async function cargarResultados() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const resultados = data.filter(item =>
      (!filtros.institucion || item.Institucion === filtros.institucion) &&
      (!filtros.areaDeEducacion || item.AreaDeEducacion === filtros.areaDeEducacion) &&
      (!filtros.modalidad || item.Modalidad === filtros.modalidad) &&
      (!filtros.regimen || item.Regimen === filtros.regimen) &&
      (!filtros.carrera || item.Carrera === filtros.carrera)
    );

    const tbody = document.getElementById("tabla-resultados");
    tbody.innerHTML = "";

    resultados.forEach(item => {
      const row = document.createElement("tr");

      const arancelReferenciaFormateado = new Intl.NumberFormat('es-CL', {
        style: 'currency', currency: 'CLP'
      }).format(item.Aranceldereferencia || 0);

      row.setAttribute("data-arancel-referencia", item.Aranceldereferencia || 0);
      row.setAttribute("data-duracion", item.Duracion || 0);

      row.innerHTML = `
        <td>${item.Institucion}</td>
        <td>${item.Carrera}</td>
        <td>${item.Sede || "N/A"}</td>
        <td>${item.Modalidad || "N/A"}</td>
        <td>${item.Regimen || "N/A"}</td>
        <td>${item.Duracion || "N/A"}</td>
        <td>${item.Arancel || "N/A"}</td>
        <td>${arancelReferenciaFormateado}</td>
        <td>${item.Matricula || "N/A"}</td>
      `;
      tbody.appendChild(row);
    });

    if (resultados.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9">No se encontraron resultados.</td></tr>`;
    }

    configurarEventosClickEnTabla();
  } catch (error) {
    console.error("Error al cargar resultados:", error);
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  agregarEstiloSeleccionado();
  cargarResultados();
});
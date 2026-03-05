document.addEventListener("filaSeleccionada", (event) => {
  const { arancelReferencia, duracion, carreraSeleccionada, filaSeleccionada } = event.detail;

  // Actualizar los valores en la calculadora
  const arancelInput = document.getElementById("arancel");
  const carreraInput = document.getElementById("carrera");

  if (arancelInput) {
    arancelInput.value = formatearPesos(arancelReferencia);
    arancelInput.setAttribute("data-duracion", duracion);
  } else {
    console.error("No se encontró el elemento con id 'arancel'");
  }

  if (carreraInput) {
    carreraInput.value = carreraSeleccionada;
  } else {
    console.error("No se encontró el elemento con id 'carrera'");
  }

  // Marcar la fila seleccionada visualmente
  document.querySelectorAll(".fila-seleccionada").forEach(fila => {
    fila.classList.remove("fila-seleccionada");
  });

  if (filaSeleccionada) {
    filaSeleccionada.classList.add("fila-seleccionada");
  }
});

document.getElementById("calcular").addEventListener("click", () => {
  const arancelInput = document.getElementById("arancel");
  const becaInput = document.getElementById("beca");
  const creditoInput = document.getElementById("credito");
  const resultado = document.getElementById("resultado");

  if (!arancelInput || !becaInput || !creditoInput || !resultado) {
    console.error("Faltan elementos en el HTML para la calculadora.");
    return;
  }

  const arancel = parseInt(arancelInput.value.replace(/\./g, '').replace('$', '')) || 0;
  const beca = becaInput.value;
  const credito = parseInt(creditoInput.value.replace(/\./g, '').replace('$', '')) || 0;
  const duracion = parseInt(arancelInput.getAttribute("data-duracion")) || 0;

  let descuento = 0;

  if (beca === "full") {
    descuento = arancel;
  } else if (beca) {
    descuento = parseInt(beca);
  }

  const nuevoArancel = Math.max(0, arancel - descuento);

  if (credito > nuevoArancel) {
    resultado.textContent = "El monto del crédito supera el nuevo arancel después de aplicar la beca. Ingrese un nuevo valor.";
    resultado.style.color = "red";
    return;
  }

  const arancelFinal = Math.round(Math.max(0, nuevoArancel - credito));
  const arancelTotal = Math.round((arancelFinal * duracion) / 2);
  const arancelMensual = Math.round(arancelFinal / 10);

  resultado.innerHTML = `
    <strong>Resultados:</strong><br>
    Nuevo arancel anual: ${formatearPesos(arancelFinal)}<br>
    Arancel total estimado (duración considerada): ${formatearPesos(arancelTotal)}<br>
    Pago mensual estimado: ${formatearPesos(arancelMensual)}
  `;
  resultado.style.color = "black";
});

document.getElementById("limpiar-calculadora").addEventListener("click", () => {
  const arancelInput = document.getElementById("arancel");
  const carreraInput = document.getElementById("carrera");
  const becaInput = document.getElementById("beca");
  const creditoInput = document.getElementById("credito");
  const resultado = document.getElementById("resultado");

  if (!arancelInput || !carreraInput || !becaInput || !creditoInput || !resultado) {
    console.error("Faltan elementos en el HTML para limpiar la calculadora.");
    return;
  }

  arancelInput.value = "";
  carreraInput.value = "";
  becaInput.value = "";
  creditoInput.value = "";
  resultado.textContent = "Seleccione una fila de la tabla para comenzar.";
  resultado.style.color = "black";

  // Eliminar el marcado visual de la fila seleccionada
  document.querySelectorAll(".fila-seleccionada").forEach(fila => {
    fila.classList.remove("fila-seleccionada");
  });
});

document.getElementById("credito").addEventListener("input", (e) => {
  const valor = e.target.value.replace(/[^0-9]/g, '');
  if (!isNaN(valor)) {
    e.target.value = formatearPesos(valor).slice(1);
  }
});

function formatearPesos(valor) {
  return `$${Number(valor).toLocaleString('es-CL')}`;
}

// Inicializar la calculadora
document.addEventListener("DOMContentLoaded", () => {
  mostrarCalculadora();
});

  
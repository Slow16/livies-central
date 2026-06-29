console.log("script.js cargado");

document.addEventListener("DOMContentLoaded", function () {
  const previewBienvenida = document.querySelector("#preview_bienvenida");

  const nombreInput = document.querySelector("#nombre");
  const edadInput = document.querySelector("#edad");
  const paisInput = document.querySelector("#pais");
  const cancionInput = document.querySelector("#cancion");
  const apodoInput = document.querySelector("#apodo");
  const generoInputs = document.querySelectorAll('input[name="genero"]');

  function obtenerGenero() {
    const generoSeleccionado = document.querySelector(
      'input[name="genero"]:checked',
    );
    return generoSeleccionado ? generoSeleccionado.value : "";
  }

  function valorOCampo(input, textoDefault) {
    return input.value.trim() || textoDefault;
  }

  function actualizarPreview() {
    const nombre = valorOCampo(nombreInput, "[nombre]");
    const edad = valorOCampo(edadInput, "[edad]");
    const pais = valorOCampo(paisInput, "[pais]");
    const cancion = valorOCampo(cancionInput, "[fav_song]");
    const apodo = valorOCampo(apodoInput, "[apodo]");
    const genero = obtenerGenero();

    let cancionPreview = cancion;
    let cancionClase = "";

    if (cancion.trim().toLowerCase() === "honeybee") {
      cancionPreview = `${cancion} 🐝`;
      cancionClase = "preview__song--honeybee";
    }

    previewBienvenida.classList.remove(
      "preview__caja--femenino",
      "preview__caja--masculino",
    );

    let mensaje = "";

    if (genero === "Masculino") {
      previewBienvenida.classList.add("preview__caja--masculino");

      mensaje = `@all 𓂃 ⊹ ࣪
ೃ⁀➷ Un nuevo integrante llegó a la comunidad ⋆.˚

🩵 Él es <strong>${nombre}</strong>, aunque también pueden llamarlo <strong>${apodo}</strong>.
se une desde <strong>${pais}</strong>, tiene <strong>${edad}</strong> años y su canción favorita es <strong class='${cancionClase}'>"${cancionPreview}"</strong>. 🩵

¡denle la bienvenida!`;
    } else {
      previewBienvenida.classList.add("preview__caja--femenino");

      mensaje = `@all 𓂃 ⊹ ࣪
ೃ⁀➷ Una nueva chica llegó a la comunidad ⋆.˚

💌 Ella es <strong>${nombre}</strong>, aunque también pueden llamarla <strong>${apodo}</strong>.
se une desde <strong>${pais}</strong>, tiene <strong>${edad}</strong> años y su canción favorita es <strong class='${cancionClase}'>"${cancionPreview}"</strong>. 🩷

¡Denle la bienvenida, Livies!`;
    }

    previewBienvenida.innerHTML = mensaje;
  }

  const camposPreview = [
    nombreInput,
    edadInput,
    paisInput,
    cancionInput,
    apodoInput,
  ];

  camposPreview.forEach(function (campo) {
    campo.addEventListener("input", actualizarPreview);
  });

  generoInputs.forEach(function (generoInput) {
    generoInput.addEventListener("change", actualizarPreview);
  });

  actualizarPreview();
});

// Separador de fecha

function separarFecha(valorInput) {
  const [anio, mes, dia] = valorInput.split('-');
  return { anio, mes, dia };
}

const form = document.querySelector('#ficha-form');

form.addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const fechaInput = document.querySelector('#cumpleanos').value;
  const { anio, mes, dia } = separarFecha(fechaInput);

  const datos = new FormData();
  datos.append('entry.1709572441', document.querySelector('#nombre').value);
  datos.append('entry.701155027', document.querySelector('#edad').value);
  datos.append('entry.1353127722', iti.getNumber());
  datos.append('entry.1539577131', document.querySelector('#pais').value);
  datos.append('entry.157632483', document.querySelector('#cancion').value);
  datos.append('entry.171517960', document.querySelector('#reclutado').value);
  datos.append('entry.1452432076', document.querySelector('#red-social').value);
  datos.append('entry.1779525952', document.querySelector('#apodo').value);
  datos.append('entry.155157707', document.querySelector('#confirmacion').value);

  datos.append('entry.1758397492_year', anio);
  datos.append('entry.1758397492_month', mes);
  datos.append('entry.1758397492_day', dia);

  const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;
  datos.append('entry.862047522', generoSeleccionado);

  const aceptaReglas = document.querySelector('#acepta-reglas').checked;
  datos.append('entry.1123329061', aceptaReglas ? 'Si' : 'No');

  try {
    await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe-3gc1Pe7_FnSNWw95p_-Kv3rEFxpC7HetJTONZzw5Gk9NfQ/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: datos
    });

    const edad = document.querySelector('#edad').value;
    window.location.href = 'gracias.html?edad=' + encodeURIComponent(edad);
  } catch (error) {
    console.error('Error enviando el formulario:', error);
    alert('No se pudo enviar el formulario. Inténtalo otra vez.');
  }
});
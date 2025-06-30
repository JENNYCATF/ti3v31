document.getElementById("registroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
  const taller = document.getElementById("taller").value.trim();

  let errores = [];

  if (!nombres) errores.push("El campo Nombres es obligatorio.");
  if (!apellidos) errores.push("El campo Apellidos es obligatorio.");
  if (!correo) errores.push("El campo Correo es obligatorio.");
  if (!rut) errores.push("El campo RUT es obligatorio.");
  if (!fechaNacimiento) errores.push("El campo Fecha de Nacimiento es obligatorio.");
  if (!taller) errores.push("Debe seleccionar un taller.");


  if (rut) {
    if (rut.includes(".")) {
      errores.push("El RUT no puede contener puntos.");
    }
    const rutRegex = /^\d{7,8}-[0-9Kk]$/;
    if (!rutRegex.test(rut)) {
      errores.push("El RUT debe tener el formato nnnnnnnn-n, solo números y guión.");
    } else {
      const [numero, dv] = rut.split("-");
      if (calcularDV(numero) !== dv.toUpperCase()) {
        errores.push("El dígito verificador del RUT no corresponde.");
      }
    }
  }

  // Fecha de nacimiento
  const fechaRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (fechaNacimiento) {
    const match = fechaNacimiento.match(fechaRegex);
    if (!match) {
      errores.push("La fecha debe tener el formato dd/mm/aaaa.");
    } else {
      const dd = parseInt(match[1]);
      const mm = parseInt(match[2]);
      const aaaa = parseInt(match[3]);

      if (dd < 1 || dd > 31 || mm < 1 || mm > 12 || aaaa < 0 || aaaa > 9999) {
        errores.push("La fecha tiene valores fuera de rango.");
      } else {
        const hoy = new Date();
        const fechaNac = new Date(aaaa, mm - 1, dd);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const m = hoy.getMonth() - fechaNac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
          edad--;
        }
        if (edad < 14) {
          errores.push("Debe tener al menos 14 años cumplidos para inscribirse.");
        }
      }
    }
  }

  // Correo con estructura estricta
  const correoRegex = /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z0-9]+)$/;
  if (correo) {
    const match = correo.match(correoRegex);
    if (!match) {
      errores.push("El correo debe tener el formato direccion@dominio.pais.");
    } else {
      const direccion = match[1];
      const dominio = match[2];
      const pais = match[3];
      if (!/^[a-zA-Z0-9.-]+$/.test(direccion)) {
        errores.push("La parte de dirección solo puede tener letras, números, guiones y puntos.");
      }
      if (!/^[a-zA-Z0-9.-]+$/.test(dominio)) {
        errores.push("La parte del dominio solo puede tener letras, números, guiones y puntos.");
      }
      if (!/^[a-zA-Z0-9]+$/.test(pais)) {
        errores.push("La parte del país solo puede tener letras y números, sin puntos ni guiones.");
      }
    }
  }

  if (errores.length > 0) {
    alert("Errores encontrados:\n\n" + errores.join("\n"));
    return;
  }

  alert("Formulario enviado correctamente ✅");
});

function calcularDV(rut) {
  let suma = 0;
  let multiplo = 2;
  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) return "0";
  if (dvEsperado === 10) return "K";
  return dvEsperado.toString();
}
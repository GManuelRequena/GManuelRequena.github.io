document.addEventListener("DOMContentLoaded", function () {
  const inputEmail = document.querySelector("#email");
  const inputCopy = document.querySelector("#copy");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const enviarBtn = document.querySelector('#formulario button[type="submit"]');
  const resetBtn = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  //Asignar eventos
  inputEmail.addEventListener("blur", validar);

  inputCopy.addEventListener("blur", validarCopy);

  inputAsunto.addEventListener("blur", validar);

  inputMensaje.addEventListener("blur", validar);

  formulario.addEventListener("submit", enviarEmail);

  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario(e);
  });

  //Funciones

  function validar(e) {
    if (e.target.value.trim() === "" && e.target.id !== "copy") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    //Asignar valores a objeto
    email[e.target.name] = e.target.value.trim().toLowerCase();

    //Comprobar objeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    const error = document.createElement("DIV");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function validarCopy(e) {
    email[e.target.name] = e.target.value.trim().toLowerCase();
    if (!validarEmail(e.target.value)) {
      mostrarAlerta("El copy no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
    } else {
      limpiarAlerta(e.target.parentElement);
      comprobarEmail();
    }
    if (e.target.value === "") {
      delete email.copy;
      limpiarAlerta(e.target.parentElement);
      comprobarEmail();
      return;
    }
  }

  function comprobarEmail() {
    console.log(email);
    if (!Object.values(email).includes("")) {
      enviarBtn.classList.remove("opacity-50");
      enviarBtn.disabled = false;
      return;
    }
    enviarBtn.classList.add("opacity-50");
    enviarBtn.disabled = true;
  }

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");
      resetFormulario(e);

      //Alerta enviado
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado";
      formulario.appendChild(alertaExito);
      setTimeout(() => {
        alertaExito.remove();
      }, 2000);
    }, 3000);
  }

  function resetFormulario(e) {
    //Reiniciar el objeto
    email.email = "";
    email.asunto = "";
    email.mensaje = "";

    limpiarAlerta(e.target.parentElement.parentElement);

    formulario.reset();
    comprobarEmail();
  }
});

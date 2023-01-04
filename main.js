const d = document;

const $campoTexto = d.querySelector("#message"),
  $btnEncriptar = d.querySelector("#btnEncriptar"),
  $btnDesencriptar = d.querySelector("#btnDesencriptar"),
  $campoResultado = d.querySelector("#resultado"),
  $DivResultado = d.querySelector(".result__text"),
  $alert = d.querySelector(".form__alert"),
  $btnCopiar = d.querySelector("#btnCopiar"),
  $mensajeVacio = d.querySelector("#sinMensaje");



  // desactivar Enter(para evitar encriptar mensajes encriptados)
  window.addEventListener("keypress", function(event){
    if (event.keyCode == 13){
        event.preventDefault();
    }
}, false);

// - Debe funcionar solo con letras minúsculas
// - No deben ser utilizados letras con acentos ni caracteres especiales

// ?expresion regular para validar que no se ingresen caracteres especiales
const formato = /[`ñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


d.addEventListener("click", (e) => {
  let texto = $campoTexto.value;

  // validar que no contenga caracteres especiales ni minusculas o tildes
  function validarTexto(textoParaValidar) {
    if (formato.test(textoParaValidar) || texto !== texto.toLowerCase()) {
      $alert.classList.add("alert-active");
      return false;
    } else {
      $alert.classList.remove("alert-active");
      return true;
    }
  }

// validar que por lo menos se haya ingresado una letra en el input
  function validarCampoRellenado() {
    if(texto.length == 0){
      $mensajeVacio.classList.remove("ocultar");
      $DivResultado.classList.add("ocultar"); 
    }
  }

// encriptar mensaje
  const encriptarMensaje = () => {
    var variablesEncriptadas = {
      a: "ai",
      e: "enter",
      i: "imes",
      o: "ober",
      u: "ufat",
    };
    mensajeEncriptado = texto.replace(/a|e|i|o|u/g, function (matched) {
      return variablesEncriptadas[matched];
    });
  
    $mensajeVacio.classList.add("ocultar");
    $DivResultado .classList.remove("ocultar");
    $campoResultado.innerHTML = mensajeEncriptado;
    
    validarCampoRellenado();
  };

// desencriptar mensaje
  const desencriptarMensaje = () => {
    var variablesDesencriptadas = {
      ai:    "a",
      enter: "e",
      imes:  "i",
      ober:  "o",
      ufat:  "u",
    };
    mensajeDesencriptado = texto.replace(/ai|enter|imes|ober|ufat/g, function (matched) {
      return variablesDesencriptadas[matched];
    });
  
    $mensajeVacio.classList.add("ocultar");
    $DivResultado .classList.remove("ocultar");
    $campoResultado.innerHTML = mensajeDesencriptado;
    
    validarCampoRellenado();
  };

  

// - Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.

  // al presionar el boton encriptar
  if (e.target === $btnEncriptar) {
    e.preventDefault();
    if (validarTexto(texto)) {
      encriptarMensaje();
    }
  }

  // al presionar el boton desencriptar
  if (e.target === $btnDesencriptar) {
    e.preventDefault();
    if (validarTexto(texto)) {
      desencriptarMensaje();
    }
  }

  // ?Copiar texto desencriptado
  if(e.target === $btnCopiar){

    const mensaje = $campoResultado.value;
    // mensaje.select();
    navigator.clipboard.writeText(mensaje);
  }
});



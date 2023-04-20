//
// Menu responsive
//
function abrirMenu() {
  var nav = $("nav").eq(0);
  var botonCierre = $("#boton-cierre");
  var menuConNombres = $("#menu-con-nombres");

  nav.addClass("nav nav-abierto").attr("id", "abrir-menu");
  botonCierre.show();
  nav
    .css({
      display: "flex",
      width: "0",
    })
    .animate(
      {
        width: "50%",
      },
      300
    );
  menuConNombres.show();
  $("body").addClass("no-scroll");

  $(document).on("keydown", function (e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      e.preventDefault();
      return false;
    }
  });
}

function cerrarMenu() {
  var nav = $("nav").eq(0);
  var botonCierre = $("#boton-cierre");
  var menuConNombres = $("#menu-con-nombres");

  nav.animate({ width: 0 }, 200, function () {
    nav.removeClass("nav nav-abierto").removeAttr("id").removeAttr("style");
    botonCierre.hide();
    menuConNombres.css("display", "flex");
  });
  $("body").removeClass("no-scroll");
  $(document).off("keydown");
}

// Formulario de contacto

$(function () {
  $("#formulario-contacto").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
        minlength: 10,
        maxlength: 60,
      },
      message: {
        required: true,
        maxlength: 300,
      },
    },
    messages: {
      name: {
        required: "Este campo es obligatorio",
        minlength: "Su nombre debe tener minimo 3 caracteres",
      },
      email: {
        required: "Este campo es obligatorio",
        email: "Debe ser del tipo example@mail.com ",
        minlength: "Minimo 10 caracteres",
        maxlength: "Maximo 60 caracteres",
      },
      message: {
        required: "Este campo es obligatorio",
        maxlength: "Maximo 300 caracteres",
      },
    },

    submitHandler: function (form) {
      var nombre = $("#name").val();
      var email = $("#email").val();
      var mensaje = $("#message").val();
      $.ajax({
        url: "https://reqres.in/api/users?page=2",
        method: "POST",
        data: {
          nombre: nombre,
          email: email,
          mensaje: mensaje,
        },
        success: function (response) {
          console.log("Éxito:", response);
          alert("Tu mensaje se envio correctamente. Gracias por contactarnos");
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          alert(
            "Error al enviar el mensaje. No se pudo enviar, intentalo de nuevo."
          );
        },
      });
    },
  });
});

// Formulario de proceso

$("#formulario-de-proceso").validate({
  rules: {
    "nombre-usuario-proceso": "required",
    "nivel-curso": "required",
    "cantidad-personas": {
      required: true,
      range: [1, 10],
    },
  },
  messages: {
    "nombre-usuario-proceso": "Por favor, ingrese su nombre",
    "nivel-curso": "Por favor, seleccione un nivel",
    "cantidad-personas": {
      required: "Por favor, ingrese la cantidad de personas",
      range: "La cantidad de personas debe estar entre 1 y 10",
    },
  },
  submitHandler: function (form) {
    var nombre = $("#nombre-usuario-proceso").val();
    var nivel = $("#nivel-curso option:selected").text();
    var cantidad = $("#cantidad-personas-curso").val();
    var subtotal = 0;
    var total = 0;
    switch ($("#nivel-curso").val()) {
      case "principiante":
        subtotal = 200 * cantidad;
        break;
      case "intermedio":
        subtotal = 300 * cantidad;
        break;
      case "avanzado":
        subtotal = 400 * cantidad;
        break;
      case "profesional":
        subtotal = 500 * cantidad;
        break;
    }
    total = subtotal * 1.21;
    var data = {
      name: nombre,
      level: nivel,
      quantity: cantidad,
      subtotal: subtotal,
      total: total,
    };
    $.ajax({
      type: "POST",
      url: "https://reqres.in/api/users",
      data: data,
      success: function (response) {
        var resumen =
          "Nombre: " +
          data.name +
          "\nNivel: " +
          data.level +
          "\nCantidad: " +
          data.quantity +
          "\nSubtotal: $" +
          data.subtotal.toFixed(2) +
          "\nImpuestos: 21%" +
          "\nTotal: $" +
          data.total.toFixed(2);
        alert(resumen);
        var pdf = new jsPDF();
        pdf.text(resumen, 10, 10);
        pdf.save("resumen.pdf");
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  },
});

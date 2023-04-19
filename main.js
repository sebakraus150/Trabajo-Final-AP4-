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

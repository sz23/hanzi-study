
$(".exportar-btn").bind("click", function(event) {
  exportar();
  return false;
});

$(".filtros > button").bind("click", function(event) {
  filtrar($(event.currentTarget));
  return false;
});

$("button.set-view").bind("click", function(event) {
  ChangeView();
  return false;
});

registrarListeners();

function registrarListeners() {
  $(".hanzi-cell").on("mouseenter", function(event) {
    $(this).popover('show');
    return false;
  });

  $(".hanzi-cell").on("mouseleave", function(event) {
    $(this).popover('hide');
    return false;
  });

  $("span.hanzi-cell").on("click", function(event) {
    HanziClicked($(event.currentTarget));
    return false;
  });
}

/*****************************************************************************
* HanziClicked(e)
*
* Agrega o elimina la clase "seleccionado" en el elemento que
* recibe por parametro.
*****************************************************************************/
function HanziClicked(e) {
    e.toggleClass('seleccionado');//,1000, "easeOutBounce");
}

/*****************************************************************************
* exportar()
*
* Envia los aquellos caracteres que han sido seleccionados a la
* accion de exportar.
*
*****************************************************************************/
function exportar() {
  var hanzis = $(".seleccionado .hanzi").text();

  if (hanzis.length == 0) {
    alert("Please, you should select some characters before exporting.");
    return;
  }

  document.location.href = "/hanzi/export/?hanzis=" + hanzis;
}

/*****************************************************************************
* filtrar(boton)
*
*
*****************************************************************************/
function filtrar(boton) {

  // Obtiene numero de filtros activos
  num = $('.filtros > button.btn-primary').length;

  /* Si era el unico filtro que quedaba y se ha desactivado, se muestran
   * todos los caracteres
   */
  if (num == 1 && boton.hasClass('btn-primary')) {
    boton.removeClass('btn-primary');
    $('.hanzi-info').show();
    return;
  }

  /* Si es el primer filtro que se activa, esconde todas las celdas */
  if (num == 0 && !boton.hasClass('btn-primary')) {
    $('.hanzi-info').hide();
  }

  boton.toggleClass('btn-primary');
  nivel = '.' + boton.text();
  if (boton.hasClass('btn-primary')) {
    $(nivel).show();
  } else {
    $(nivel).hide();
  }
}

/*****************************************************************************
* ChangeView()
*
*
*****************************************************************************/
function ChangeView() {
  var contenido = $('.hanzi-spectrum');
  var ret;
  if ($(".hanzi-grid", contenido).length != 0) {
    ret = setListView();
  } else {
    ret = setGridView();
  }

  contenido.html(ret);
  registrarListeners();
  aplicarFiltros();
}

/*****************************************************************************
* setGridView (contenido)
*
* Recie un objeto jQuery que contiene una tabla de hanzis y sustituye su
* contenido por un grid de los mismos.
*
*****************************************************************************/
function setGridView() {
    var string = "<div class='hanzi-grid'>";

    $( ".hanzi-info" ).each(function() {
      var level  = $(":nth-child(1)", $(this)).text();
      var pinyin = $(":nth-child(5)", $(this)).text();
      var trad   = $(":nth-child(4)", $(this)).text();
      string += "<span ";
        string += "data-toggle='popover' ";
        string += "data-title='<center>Character information</center>' ";
        string += "data-html='true' ";
        string += "data-animation='true' ";
        string += "data-pinyin='" + pinyin + "' ";
        string += "data-trad='" + trad + "' ";
        string += "data-content='Pinyin: " + pinyin + "<br>Traditional: " + trad + "' ";
        string += "data-original-title='' ";
        string += "class='hanzi-info hanzi-cell " + level +"'>";
        string += "<span class='hanzi'>" + $(":nth-child(3)", $(this)).text() + "</span>";
        string += "<span class='label label-inverse'>" + level + "</span>";
        string += "<br><span class='hanzi-times'>" + $(":nth-child(2)", $(this)).text() + "</span>";
      string += "</span>";
      });

    string += "</div>";
    return string;
}

/*****************************************************************************
* setListView (contenido)
*
* Recie un objeto jQuery que contiene el grid de hanzis y sustituye su
* por una tabla con los mismos datos.
*
*****************************************************************************/
function setListView() {
    var string = "<div class='hanzi-list'><table class='table table-striped'>";
    string += "<thead><tr><th>Level</th><th>Repetitions</th><th>Hanzi</th><th>Traditional</th><th>Pinyin</th>";
    string += "</tr></thead>";

    $( ".hanzi-cell" ).each(function() {
      string += "<tr class='hanzi-info " + $(this).children('.label').text() + "'>";
      string += "<th>" + $(this).children('.label').text() + "</th>";
      string += "<th>" + $(this).children('.hanzi-times').text() + "</th>";
      string += "<th>" + $(this).children('.hanzi').text() + "</th>";
      string += "<th>" +  $(this).data('trad'); + "</th>";
      string += "<th>" +  $(this).data('pinyin'); + "</th>";
      string += "</tr>";
    });

    string += "</table></div>";
    return string;
}

function aplicarFiltros() {

  var filtros = $('.filtros > button.btn-primary');

  // No hay filtros activos
  if (filtros.length == 0)
      return;
  $('.hanzi-info').hide();
  filtros.each(function() {
    var nivel = '.' + $(this).text();
    $(nivel).show();
  });

}
$.getJSON("js/lang.json", function(json){
  //Lenguaje por defecto de la página sessionStorage.setItem("lang", "idioma")"
  if(!localStorage.getItem("lang")){
    localStorage.setItem("lang", "Es");
  }
  var lang = localStorage.getItem("lang");
  var doc = json;
  $('.lang').each(function(index, element){
    $(this).text(doc[lang][$(this).attr('key')]);
  });//Each

  $('.translate').click(function(){
    localStorage.setItem("lang", $(this).attr('id')) ;
    var lang = $(this).attr('id');
    var doc = json;
      $('.lang').each(function(index, element){
        $(this).text(doc[lang][$(this).attr('key')]);
      }); //Each
  }); //Funcion click
      $('#Es').click(function(){
        $('#verificar', window.parent.document).val('Verificar');
    });
    $('#En').click(function(){
        $('#verificar', window.parent.document).val('Check');
    });
    $('#Fr').click(function(){
        $('#verificar', window.parent.document).val('Chèque');
    });
    $('#中国').click(function(){
        $('#verificar', window.parent.document).val('查看');
    });
    $('#De').click(function(){
      $('#verificar', window.parent.document).val('prüfen');
    });
    $('#Po').click(function(){
      $('#verificar', window.parent.document).val('Verifica');
    });
});//Get json AJAX

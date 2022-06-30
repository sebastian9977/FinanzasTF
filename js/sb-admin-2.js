(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    }
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict


function Sumar(){
  var ValorNominal= document.getElementById("VNominal");
  var ValorComercial= document.getElementById("VComercial");
  var Frecuencia=document.getElementById("Frecuencia");
  var Capitalizacion = document.getElementById("Capitalizacion");
  var DiasPorAno=document.getElementById("DiasporAno");
  var N =  document.getElementById("N");
  var TipoTasa=document.getElementById("TipoTasa");
  var TasaInteres=document.getElementById("Interes");
  var TasaDcto=document.getElementById("TasaDcto");

  var ResFrecuencia= document.getElementById("RFrecuencia");
  var ResCapitalizacion= document.getElementById("RCapitalizacion");
  var ResPeriodosxAno=document.getElementById("RPeriodosPorAno");
  var ResNroPeriodos=document.getElementById("RPeriodos");
  var ResTEA=document.getElementById("RTEA");
  var ResTES=document.getElementById("RTES");
  var ResCOk=document.getElementById("RCOKS");
  var ResCostesEmisor=document.getElementById("RCostesEmisor");
  var ResCostesBonista=document.getElementById("RCostesBonista");
  var ResPrecioActual= document.getElementById("RPrecioActual");
  var ResUtilidad=document.getElementById("RUtilidad");
  var ResDuracion=document.getElementById("RDuracion");
  var ResConvexidad= document.getElementById("RConvexidad");
  var ResTotalRatios =document.getElementById("RTotalRatios");
  var ResDuracionMod=document.getElementById("RDuracionModificada");
  var ResTCEA= document.getElementById("RTCEA");
  var ResTREA= document.getElementById("RTREA");

  //FrecuenciaRes
  switch (Frecuencia.value){
    case 'Mensual':
      ResFrecuencia.innerText=30;
      break;
    case 'Bimestral':
      ResFrecuencia.innerText=60;
      break;
    case 'Trimestral':
      ResFrecuencia.innerText=90;
      break;
    case 'Cuatrimestral':
      ResFrecuencia.innerText=120;
      break;
    case 'Semestral':
      ResFrecuencia.innerText=180;
      break;
    case 'Anual':
      ResFrecuencia.innerText=360;
      break;
  }
  //CapitalizacionRes
  switch (Capitalizacion.value){
    case 'Diaria':
      ResCapitalizacion.innerText=1;
      break;
    case 'Quincenal':
      ResCapitalizacion.innerText=15;
      break;
    case 'Mensual':
      ResCapitalizacion.innerText=30;
      break;
    case 'Bimestral':
      ResCapitalizacion.innerText=60;
      break;
    case 'Trimestral':
      ResCapitalizacion.innerText=90;
      break;
    case 'Cuatrimestral':
      ResCapitalizacion.innerText=120;
      break;
    case 'Semestral':
      ResCapitalizacion.innerText=180;
      break;
    case 'Anual':
      ResCapitalizacion.innerText=360;
      break;
  }
  //DiasPorAnoRes
  switch (DiasPorAno.value){
    case '360':
      ResPeriodosxAno.innerText=(360/ResFrecuencia.innerText);
      break;
    case '365':
      ResPeriodosxAno.innerText=(365/ResFrecuencia.innerText);
      break;
  }
  //NroPeriodosRes
  ResNroPeriodos.innerText=ResPeriodosxAno.innerText*N.value;
  //TEARes
  switch (TipoTasa.value){
    case 'Efectiva':
      ResTEA.innerText=TasaInteres.value;
      break;
    case 'Nominal':
      ResTEA.innerText= ((((1+(TasaInteres.value/100)/(DiasPorAno.value/ResCapitalizacion.innerText))**(DiasPorAno.value/ResCapitalizacion.innerText))-1)*100).toFixed(5);
      break;
  }
  //TESRes
  ResTES.innerText=(((1+(ResTEA.innerText/100))**(ResFrecuencia.innerText/DiasPorAno.value)-1)*100).toFixed(5);
  //COKSRes
  ResCOk.innerText=(((1+(TasaDcto.value/100))**(ResFrecuencia.innerText/DiasPorAno.value)-1)*100).toFixed(5);
  //CostesEmisorRes
  ResCostesEmisor.innerText=(0.022*ValorComercial.value).toFixed(2);
  //CostesBonistaRes
  ResCostesBonista.innerText=(0.0095*ValorComercial.value).toFixed(2);

  var f =(1+(ResTES.innerText/100))**ResNroPeriodos.innerText;
  var cuota=ValorNominal.value*(f*(ResTES.innerText/100)/(f-1));
  var f2=ValorNominal.value;
  for (var i=0;i<ResNroPeriodos.innerText-1;i++){
    f2-=(cuota-(f2*(ResTES.innerText/100)));
  }
  var prima=(f2*0.01).toFixed(2);

  var f3 =(1+(ResCOk.innerText/100))**ResNroPeriodos.innerText;
  var VPCuotas=cuota*((f3-1)/(f3*(ResCOk.innerText/100)));
  var VPPrima=(prima/((1+(ResCOk.innerText/100))**ResNroPeriodos.innerText));

  ResPrecioActual.innerText=(VPCuotas+VPPrima).toFixed(2);
  ResUtilidad.innerText=((VPCuotas+VPPrima)-(parseInt(ValorComercial.value)+parseFloat(ResCostesBonista.innerText))).toFixed(2);

  var  f4=0;
  for (var i=1;i<(parseInt(ResNroPeriodos.innerText)+1);i++){
    f4+=(i/((1+(ResCOk.innerText/100))**i));
  }
  var primaAlt=prima*(ResFrecuencia.innerText/DiasPorAno.value)*parseInt(ResNroPeriodos.innerText)/((1+(ResCOk.innerText/100))**parseInt(ResNroPeriodos.innerText));

  ResDuracion.innerText=(((f4*(ResFrecuencia.innerText/DiasPorAno.value)*cuota)+primaAlt)/ResPrecioActual.innerText).toFixed(2);
  var  f5=0;
  for (var i=1;i<(parseInt(ResNroPeriodos.innerText)+1);i++){
    f5+=((i*(i+1))/((1+(ResCOk.innerText/100))**i));
  }
  var primaAlt2=prima*(parseInt(ResNroPeriodos.innerText)+1)*parseInt(ResNroPeriodos.innerText)/((1+(ResCOk.innerText/100))**parseInt(ResNroPeriodos.innerText));

  ResConvexidad.innerText=(((f5*cuota)+primaAlt2)/(((1+(ResCOk.innerText/100))**2)*(ResPrecioActual.innerText)*((DiasPorAno.value/ResFrecuencia.innerText)**2))).toFixed(2);

  ResTotalRatios.innerText=(parseFloat(ResDuracion.innerText)+parseFloat(ResConvexidad.innerText));

  ResDuracionMod.innerText=(ResDuracion.innerText/(1+(ResCOk.innerText/100))).toFixed(2);
  var menor=[0,1000];

  for (var i=1;i<101;i++){
    var x=0;
    for (var j=1;j<(parseInt(ResNroPeriodos.innerText)+1);j++){
      x+=(cuota/((1+(i/100))**j));
    }
    x-=(parseFloat(ValorComercial.value)-parseFloat(ResCostesEmisor.innerText));

    if(x<menor[1]&&x>0){
      menor =[i,x];
      }
  }
  var menorEnt= menor[0]
  for (var i=1;i<101;i++){
    var x=0;
    for (var j=1;j<(parseInt(ResNroPeriodos.innerText)+1);j++){
      if(j==10){
        x+=((cuota+parseFloat(prima))/((1+((menorEnt+(i*0.01))/100))**j));
      }
      else {
        x+=(cuota/((1+((menorEnt+(i*0.01))/100))**j));
      }
    }
    x-=(parseFloat(ValorComercial.value)-parseFloat(ResCostesEmisor.innerText));

    if(x<menor[1]&&x>0){
      menor =[menorEnt+(i*0.01),x];
    }
  }
  var Tir=menor[0];

  ResTCEA.innerText=(((((Tir/100)+1)**(DiasPorAno.value/ResFrecuencia.innerText))-1)*100).toFixed(2);

  var menorBo=[0,1000];

  for (var i=1;i<101;i++){
    var x=0;
    for (var j=1;j<(parseInt(ResNroPeriodos.innerText)+1);j++){
      x+=(cuota/((1+(i/100))**j));
    }
    x-=(parseFloat(ValorComercial.value)+parseFloat(ResCostesBonista.innerText));
    console.log(i);
    console.log(x);
    console.log(menorBo);
    if(x<menorBo[1]&&x>0){
      menorBo =[i,x];
    }
  }
  var menorBoEnt= menorBo[0]
  for (var i=1;i<101;i++){
    var x=0;
    for (var j=1;j<(parseInt(ResNroPeriodos.innerText)+1);j++){
      if(j==10){
        x+=((cuota+parseFloat(prima))/((1+((menorBoEnt+(i*0.01))/100))**j));
      }
      else {
        x+=(cuota/((1+((menorBoEnt+(i*0.01))/100))**j));
      }
    }
    x-=(parseFloat(ValorComercial.value)+parseFloat(ResCostesBonista.innerText));
    console.log(i);
    console.log(x);
    console.log(menorBo);
    if(x<menorBo[1]&&x>0){
      menorBo =[menorBoEnt+(i*0.01),x];
    }
  }
  var TirBo=menorBo[0];
  ResTREA.innerText=(((((TirBo/100)+1)**(DiasPorAno.value/ResFrecuencia.innerText))-1)*100).toFixed(2);

}
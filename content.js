$(document).ready(function() {
  console.log("aaa");
  $('map').imageMapResize();
});

$(function() {
  var baseX = $('#parallax').offset().left + 180;
  var baseY = $('#parallax').offset().top  + 240;
  var layers = $('#parallax').children().map(function(_, layer) {
    return {
      $: $(layer),
      factor:$(layer).data("z")/8000,
      baseX:$(layer).position().left,
      baseY:$(layer).position().top
    };
  });
  $(document.body).mousemove(function(ev) {
    $.each(layers, function(_, layer) {
      var dx = ev.pageX - baseX;
      var dy = ev.pageY - baseY;
      layer.$.css({
        left:layer.baseX + (dx*layer.factor) +"px",
        top:layer.baseY + (dy*layer.factor) +"px" });
      });
    });
    var isSP = navigator.userAgent.search(/(iPhone|iPad|Android)/) !== -1;
    !isSP && $(document.body).mousemove(function(ev) {
      var dx = ev.pageX - baseX;
      var dy = ev.pageY - baseY;
      $.each(layers, function(_, layer) {
        layer.$.css({
          left:layer.baseX + (dx*layer.factor) +"px",
          top:layer.baseY + (dy*layer.factor) +"px" });
        });
      });

      isSP && window.addEventListener("devicemotion", function(ev){
        var dy = baseY/2 + ev.accelerationIncludingGravity.y*100;
        var dx = baseX/2 - ev.accelerationIncludingGravity.x*100;
        $.each(layers, function(_, layer) {
          layer.$.css({
            left:layer.baseX + (dx*layer.factor) +"px",
            top:layer.baseY + (dy*layer.factor) +"px" });
          });
        });
      });

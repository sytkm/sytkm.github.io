$(document).ready(function() {
  $('map').imageMapResize();
  $("#modal-twitter").iziModal();
  $("#modal-skype").iziModal();
  $("#modal-pixiv").iziModal();
  $("#modal-github").iziModal();
  $("#modal-hatenablog").iziModal();
  $("#modal-instagram").iziModal();
  $("#modal-bookshell").iziModal();
});

$(function() {
  var baseX = $('#parallax').offset().left + 180;
  var baseY = $('#parallax').offset().top + 120;
  var layers = $('#parallax').children().map(function(_, layer) {
    return {
      $: $(layer),
      factor: $(layer).data("z") / 8000,
      baseX: $(layer).position().left,
      baseY: $(layer).position().top,
      basecoords: $("#" + layer.className + "area").length ? $("#" + layer.className + "area").attr('coords') : ''
    };
  });
  /*
  $(document.body).mousemove(function(ev) {
    $.each(layers, function(_, layer) {
      var dx = ev.pageX - baseX;
      var dy = ev.pageY - baseY;

      var $this = $("#" + layer.$[0].className + "area");
      if (layer.basecoords.length) {
        var coords = layer.basecoords.split(','),
        newcoords = new Array(coords.length);

        for (var i = 0; i < newcoords.length; ++i) {
          if (i % 2 === 0)
          newcoords[i] = parseInt(+coords[i] + (dx * layer.factor));
          else
          newcoords[i] = parseInt(+coords[i] + (dy * layer.factor));
        }
        $this.attr('coords', newcoords.toString());
      }
      layer.$.css({
        left: layer.baseX + (dx * layer.factor) + "px",
        top: layer.baseY + (dy * layer.factor) + "px"
      });
    });
  });
  */
  var isSP = navigator.userAgent.search(/(iPhone|iPad|Android)/) !== -1;
  !isSP && $(document.body).mousemove(function(ev) {
    var dx = ev.pageX - baseX;
    var dy = ev.pageY - baseY;



    $.each(layers, function(_, layer) {
      var $this = $("#" + layer.$[0].className + "area");
      if (layer.basecoords.length) {
        var coords = layer.basecoords.split(','),
        newcoords = new Array(coords.length);

        for (var i = 0; i < newcoords.length; ++i) {
          if (i % 2 === 0)
          newcoords[i] = parseInt(+coords[i] + (dx * layer.factor));
          else
          newcoords[i] = parseInt(+coords[i] + (dy * layer.factor));
        }
        $this.attr('coords', newcoords.toString());
      }
      layer.$.css({
        left: layer.baseX + (dx * layer.factor) + "px",
        top: layer.baseY + (dy * layer.factor) + "px"
      });
    });
  });

  isSP && window.addEventListener("devicemotion", function(ev) {
    var dy = baseY / 2 + ev.accelerationIncludingGravity.y * 25;
    var dx = baseX / 2 - ev.accelerationIncludingGravity.x * 25;



    $.each(layers, function(_, layer) {
      var $this = $("#" + layer.$[0].className + "area");
      if (layer.basecoords.length) {
        var coords = layer.basecoords.split(','),
        newcoords = new Array(coords.length);

        for (var i = 0; i < newcoords.length; ++i) {
          if (i % 2 === 0)
          newcoords[i] = parseInt(+coords[i] + (dx * layer.factor));
          else
          newcoords[i] = parseInt(+coords[i] + (dy * layer.factor));
        }
        $this.attr('coords', newcoords.toString());
      }
      layer.$.css({
        left: layer.baseX + (dx * layer.factor) + "px",
        top: layer.baseY + (dy * layer.factor) + "px"
      });
    });
  });
});

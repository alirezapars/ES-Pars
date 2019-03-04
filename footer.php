</body>
</html>
<script>
// قابلیت زوم
$(function() {

          var $section = $('#content');
          var $panzoom = $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset"),

          });
          $panzoom.parent().on('mousewheel.focal', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
              startTransform: 'scale(1.1)',
              increment: 0.1,
              minScale: 1,
              // contain: 'invert'
              focal: e,
              cursor: 'move',
              maxScale: 1,
              // which: 2,

              // disablePan: true,


            });
          });
 });



</script>
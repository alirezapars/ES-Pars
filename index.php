<?php require_once 'header.php'  ?>
  <div class="bgpopup" id="modal-op-node-bgpopup">
      <div class="modal" id="modal-op-node">
          <span id="modal-text"> افزودن سوال </span>
          <input type="text" id="input-add-type" data-type="atr" data-action="add-node" data-id="" value="" placeholder="مقداری وارد کنید">
          <button type="button" class="modal-btn-add" id="btn-add-type" name="button"><i class="fa fa-plus-square-o"></i> افزودن</button>
          <button type="button" class="modal-btn-close" id="close-modal">بستن</button>
      </div>
  </div>
  
  <div id="content">
  <?php require_once 'inc/home-left-menu.php'; ?>
    <div class="tree panzoom">
      <!-- نگهداری آیدی اولین مشخصه -->
      <input type="hidden" id="temp-inp-first-attr" value="">
      <input type="hidden" id="temp-inp-id" value="">
  <ul>
  <?php include 'inc/home-get-tree.php' ?>
  </ul>
    </div>
    <!-- END tree -->
  </div>
  <!-- END Content -->
<?php require_once 'footer.php'  ?>
$(document).ready(function(){

   var ajaxurl = 'inc/ajax.php';

  // دکمه ایجاد - سوال - گزینه - نتیجه جدید
  $(document).on('click','#btn-add-type',function(){
    var v_parent_id = $('#temp-inp-id').val();
    // مقدار اینپوت
    var v_input_new_type = $('#input-add-type').val();
    //  ایدی - درصورت ایجاد
    var data_id = $('#input-add-type').attr('data-id');
    // نوع عملیات - درج - حذف - بروز رسانی
    var data_action = $('#input-add-type').attr('data-action');
    // نوع - مشخصه - مقدار - نتیجه
    var data_type = $('#input-add-type').attr('data-type');

    //var action = data_action + data_type;

    // بررسی اینکه فیلد پر است یا خالی
    var validate_input = validate_data('#input-add-type');

    //alert(validate_input);

    if(validate_input==false){

    }else if (validate_input==true) {
      action_type(v_parent_id,v_input_new_type,data_id,data_action,data_type);
    }



  });



  // بستن پنجره مودال
  $(document).on('click','#close-modal',function(){
    bgpopup('off');
  });
  // بستن پنجره مدال اطلاعات درخت
  $(document).on('click','#close-modal-tree-info',function(){
    modal_info_tree('off');
  });


  // وضعیت نمایش سوال
  $("#status-view-atr").change(function(){
    if($(this).is(':checked')){
      $(this).val(1);
      $('.o-atr').removeClass('node-hide');
    }else {
      $(this).val(0);
      $('.o-atr').addClass('node-hide');
    }
  });

  // وضعیت نمایش گزینه
  $("#status-view-val").change(function(){
    if($(this).is(':checked')){
      $(this).val(1);
      $('.o-val').removeClass('node-hide');
    }else {
      $(this).val(0);
      $('.o-val').addClass('node-hide');
    }
  });

  // وضعیت نمایش نتیجه
  $("#status-view-con").change(function(){
    if($(this).is(':checked')){
      $(this).val(1);
      $('.o-con').removeClass('node-hide');
    }else {
      $(this).val(0);
      $('.o-con').addClass('node-hide');
    }
  });

  // وضعیت نمایش آیدی
  $("#status-view-id").change(function(){
    if($(this).is(':checked')){
      $(this).val(1);
      $('.show-node-id').addClass('show-node-id-true');
    }else {
      $(this).val(0);
      $('.show-node-id').removeClass('show-node-id-true');
    }
  });

  // حالت شب
  $("#status-night-mode").change(function(){
    if($(this).is(':checked')){
      $(this).val(1);
      $('#content').addClass('night-content');
      $('.o-atr').addClass('night-o-atr');
      $('.o-val').addClass('night-o-val');
      $('.o-con').addClass('night-o-con');
      $('.show-node-id').addClass('night-show-node-id');
      $('.left-menu').addClass('night-left-menu');
    }else {
      $(this).val(0);
      $('#content').removeClass('night-content');
      $('.o-atr').removeClass('night-o-atr');
      $('.o-val').removeClass('night-o-val');
      $('.o-con').removeClass('night-o-con');
      $('.show-node-id').removeClass('night-show-node-id');
      $('.left-menu').removeClass('night-left-menu');
    }
  });




  // نمایش منوی سمت چپ
  $('#button-show-menu').click(function () {
    $('.left-menu').css('left','0px');
  });

  // بستن منوی سمت چپ
  $('#button-close-menu').click(function () {
    $('.left-menu').css('left','-230px');
  });

  // نمایش اطلاعات درخت - تعداد سوالات - تعداد گزینه ها - تعداد نتیجه ها
  $('#button-show-info-tree').click(function () {

     var tree_count_atr = 0;
     var tree_count_val = 0;
     var tree_count_con = 0;
     var tree_count_total = 0;

     $("input[data-type-node='atr'").each(function() {
         tree_count_atr++;
     });
     $("input[data-type-node='val'").each(function() {
         tree_count_val++;
     });
     $("input[data-type-node='con'").each(function() {
         tree_count_con++;
     });

     // tree_count_total = tree_count_atr + tree_count_val +  tree_count_con;

     // console.log('atr: ' + tree_count_atr);
     // console.log('val: ' + tree_count_val);
     // console.log('con: ' + tree_count_con);
     // console.log('total: ' + tree_count_total);
      modal_info_tree('on',tree_count_atr,tree_count_val,tree_count_con);


  });




  /**********************************************************/
  /*******************START CONTEXTMEU***********************/

  //منوی راست کلیک
  $(function() {

     $.contextMenu({
         selector: '#content .new-action-type',
         callback: function(key, options) {
             //var m = "clicked: " + key;
             // برداشتن آیدی ایتم مورد نظر
             var data_id = options.$trigger.attr("data-id");
             $('#temp-inp-id').val(data_id);

             // آیدی نود مادر
             var parent_id = options.$trigger.attr("data-parent-id");

             // مقدار اینپوت مورد نظر - جهت عمل ویرایش
             var node_content = options.$trigger.val();
             // atr - val - con
             var node_type = options.$trigger.attr("data-type-node");

             // اگر ایتم انتخابی منو - افزودن گزینه بود
             if(key=='node-add-value'){
               $('#input-add-type').attr('data-type','val');
               $('#input-add-type').attr('data-action' ,'add-node');

               // تابع نمایش پنجره وارد کردن مقدار
               var title = 'افزودن گزینه جدید' ;
               var btntext = '<i class="fa fa-plus-square-o"></i> افزودن';
               bgpopup('on',title,btntext);


             // اگر ایتم انتخابی منو - افزودن سوال بود
             }else if(key=='node-add-attr'){
               $('#input-add-type').attr('data-type','atr');
               $('#input-add-type').attr('data-action' ,'add-node');

               // تابع نمایش پنجره وارد کردن مقدار
               var title = 'افزودن سوال جدید' ;
               var btntext = '<i class="fa fa-plus-square-o"></i> افزودن';
               bgpopup('on',title,btntext);


             // اگر ایتم انتخابی منو - افزودن نتیجه بود
             }else if (key=='node-add-con') {
               $('#input-add-type').attr('data-type','con');
               $('#input-add-type').attr('data-action' ,'add-node');

               // تابع نمایش پنجره وارد کردن مقدار
               var title = 'افزودن نتیجه جدید' ;
               var btntext = '<i class="fa fa-plus-square-o"></i> افزودن';
               bgpopup('on',title,btntext);

             // اگر ایتم انتخابی منو - ویرایش نود بود
             }else if (key=='node-edit'){

               $('#input-add-type').attr('data-type',node_type);
               $('#input-add-type').val(node_content);
               $('#input-add-type').attr('data-id',data_id);

               $('#input-add-type').attr('data-action' ,'update-node');
               var btntext = '<i class="fa fa-refresh fa-spin"></i> بروز رسانی ';
               bgpopup('on',title,btntext);

             // اگر ایتم انتخابی منو - حذف بود
             }else if (key=='node-delete'){

               var v_input_new_type = '';
               var data_action = 'delete-node';
               action_type(parent_id,v_input_new_type,data_id,data_action,node_type);

             }

         },
         items: {
             "node-edit": {
               name: "ویرایش",
               icon: "fa-pencil-square-o" ,
               disabled: false
             },

             "node-add-attr": {
               name: "افزودن سوال",
               icon: "fa-question" ,
               disabled: function(key, options){
                  // دریافت مقدار و بررسی اکشن مورد نظر
                  var action = options.$trigger.attr('data-action-attr');
                  if(action=='false'){
                    return 0 ;
                  }else{
                    return 1 ;
                  }

               }
              },

              "node-add-value": {
                name: "افزودن گزینه ",
                icon: "fa-list-ul" ,
                disabled: function(key, options){
                  var action = options.$trigger.attr('data-action-value');
                  if(action=='false'){
                    return 0 ;
                  }else{
                    return 1 ;
                  }

                }
               },

              "node-add-con": {
                name: "افزودن نتیجه ",
                icon: "fa-lightbulb-o" ,
                disabled: function(key, options){
                  var action = this.attr('data-action-con');
                  if(action=='false'){
                    return 0 ;
                  }else{
                    return 1 ;
                  }

                }
               },

              "node-delete": {
                name: " حذف ",
                icon: "fa-trash-o" ,
                disabled: function(key, options){
                  var action = this.attr('data-action-del');
                  if(action=='false'){
                    return 0 ;
                  }else{
                    return 1 ;
                  }


                }
               },


         }



     });



  });

  /**********************************************************/
  /*******************END CONTEXTMEU************************/


  // تابع درج - حذف - بروز رسانی - مشخصه مقدار
  function action_type(v_parent_id,v_input_new_type,data_id,data_action,data_type){

    $.post(ajaxurl,{
      data:{
        action:data_action,
        parent_id:v_parent_id,
        content:v_input_new_type,
        data_id:data_id,
        type:data_type
      }
    },function(response,status){
       //alert(response);
       var result = jQuery.parseJSON(response);

       var get_action   = result['action'];
       var get_id       = result['id'];
       var get_parent_id= result['parent_id'];
       var get_content  = result['content'];
       var get_type     = result['type'];
       var get_status   = result['status'];

       var get_action_value   = result['action_value'];
       var get_action_attr    = result['action_attr'];
       var get_action_con     = result['action_con'];
       var get_action_del     = result['action_del'];


       //------------------------------------

       var get_up_action    = result['up_action'];
       var get_up_parent_id = result['up_parent_id'];
       var get_up_ac_val    = result['up_ac_val'];
       var get_up_ac_atr    = result['up_ac_atr'];
       var get_up_ac_con    = result['up_ac_con'];
       var get_up_ac_del    = result['up_ac_del'];
       // اگر عملیات بروز رسانی نود مادر درخواست شد
       // مقادریر دریافتی جدید به دیتای نود مادر بروز رسانی خواهند شد
       if(get_up_action=='true' && get_action!='delete-node' ){
         var el = '#node-val-'+get_up_parent_id;
         $(el).attr('data-action-attr',get_up_ac_atr);
         $(el).attr('data-action-value',get_up_ac_val);
         $(el).attr('data-action-con',get_up_ac_con);
         $(el).attr('data-action-del',get_up_ac_del);
       }else if(get_action=='delete-node'){

         var el = '#node-val-'+get_up_parent_id;
         $(el).attr('data-action-attr',get_up_ac_atr);
         $(el).attr('data-action-value',get_up_ac_val);
         $(el).attr('data-action-con',get_up_ac_con);
         $(el).attr('data-action-del',get_up_ac_del);

         // حذف نود از درخت
         var el_2 = '.xx-node-id-'+get_id;
         $(el_2).addClass('vibrate');


         setTimeout(function(){
           $(el_2).fadeOut(600);
         },1000);

         setTimeout(function(){
           $(el_2).remove();
           $('#temp-inp-id').val('');
         },2500);



       }

       //------------------------------------

       // بروز رسانی نود
       if(get_action=='update-node'){
         var el = '#node-val-'+get_id ;
         $(el).val(get_content);
         bgpopup('off');
       }

       // پاک کردن مقدار ورودی از اینپوت
       $('#input-add-type').val('');
       $('#input-add-type').attr('data-id','');
       // اگر عملیات افزودن نود بود
       if(get_action=='add-node'){
       // ساختار کلی نود ها بصورت - HTML
       var html_node = [
         '<li class="xx-node-id-'+get_id+'"><ul id="child-of-'+get_parent_id+' node-id-'+get_id+'" class="x-node-id-'+get_id+'" >',
           '<li class="child-of-'+get_parent_id+' node-id-'+get_id+' ">',
             '<div class="o-'+get_type+'">',
               '<input type="text" id="node-val-'+get_id+'" class="new-action-type" data-id="'+get_id+'" data-type-node="'+get_type+'" data-parent-id="'+get_parent_id+'" data-action-attr="'+get_action_attr+'" data-action-value="'+get_action_value+'" data-action-con="'+get_action_con+'" data-action-del="'+get_action_del+'"  value="'+get_content+'"  placeholder=" مقدار">',
               '<span class="show-node-id"><i class="fa fa-caret-left"></i>'+get_id+'</span>',
             '</div>',
           '</li>',
         '</ul></li>'
       ].join('');

       bgpopup('off');

     }// END if action add-node

       //alert(get_parent_id);

       // اگر اولین نود بود
       if(get_parent_id==0){
         var html_node = $(html_node).hide().fadeIn(800);
         $('.tree').append(html_node);

       // اگر اولین نود - نبود
       }else if (get_parent_id!=0) {
         var html_node = $(html_node).hide().fadeIn(800);
         var el_1 = '.x-node-id-'+get_parent_id;
         $(el_1).append(html_node);
       }

    });


  }// END function action_type


  //تابع بررسی صحت داده ها
  function validate_data(elementname){
     var el = elementname ;
     var tp_data=$(el).val();
     if(tp_data !='' && tp_data.length > 0){
       $(el).removeClass("input-error");
       return true ;
     }else {
       $(el).addClass("input-error");
       return false ;
     }
  }// END function Validate_data



  // تابع تنظیم وضعیت نمایش پنجره پاپ آپ
  function bgpopup(status,title,btntext){
    $('.left-menu').css('left','-230px');
    if(status=='on'){
      $('#modal-op-node-bgpopup').fadeIn(100);
      $('#modal-op-node').removeClass('modal-fadeOut');
      $('#modal-op-node').addClass('modal-fadeIn');
      $('#modal-text').text(title);
      $('#input-add-type').focus();
    }else if(status=='off') {
      $('#modal-op-node-bgpopup').fadeOut(200);
      $('#modal-op-node').addClass('modal-fadeOut');
      $('#modal-text').text('');
      $('#input-add-type').blur();
    }

      $('#btn-add-type').empty();
      $('#btn-add-type').append(btntext);

  }

  // تابع نمایش اطلاعات درخت
  function modal_info_tree(status,tree_count_atr,tree_count_val,tree_count_con){
    var tree_count_total = tree_count_atr + tree_count_val + tree_count_con;
    var html= [
      '<div class="bgpopup" id="modal-tree-info-bgpopup" >',
          '<div id="modal-tree-info" class="modal modal-small" >',
              '<span id="modal-text"> اطلاعات </span>',
               '<div class="modal-tree-info">',
                 '<p> تعداد سوالات :    '+tree_count_atr+'   <span class="ii-color-atr"></span></p>',
                 '<p> تعداد گزینه ها : '+tree_count_val+'<span class="ii-color-val"></span></p>',
                 '<p>تعداد نتیجه ها :  '+tree_count_con+'<span class="ii-color-con"></span></p>',
                 '<p>مجموع :  '+tree_count_total+'<span class="ii-color-total"></span></p>',
              ' </div>',
              '<button type="button" class="modal-btn-close" id="close-modal-tree-info">بستن</button>',
          '</div>',
      '</div>'
    ].join('');

    if(status=='on'){
      $('#content').append(html);
      $('#modal-tree-info-bgpopup').fadeIn(100);
      $('#modal-tree-info').removeClass('modal-fadeOut');
      $('#modal-tree-info').addClass('modal-fadeIn');
    }
    if(status=='off'){
      $('#modal-tree-info-bgpopup').fadeOut(200);
      $('#modal-tree-info').removeClass('modal-fadeIn');
      $('#modal-tree-info').addClass('modal-fadeOut');
      // setTimeout(function(){
      //   $('#modal-tree-info-bgpopup').remove();
      // },1000);
    }




  }



  /************************************************************/


  // حالت فول اسکرین
  $(function () {
      $('#button-fullscreen').click(function () {
        screenfull.toggle($('#container')[0]);
        var b_val = $(this).attr('data-status');
        var btnicon = '#button-fullscreen-icon';
        if(b_val=='0'){
          $(btnicon).removeClass('fa-expand');
          $(btnicon).addClass('fa-compress');
          $(this).attr('data-status',1);
          $(this).addClass('fixed-button-on');
        }else if (b_val=='1') {
          $(btnicon).removeClass('fa-compress');
          $(btnicon).addClass('fa-expand');
          $(this).attr('data-status',0);
          $(this).removeClass('fixed-button-on');
        }

      });
  });



 // تغییر طول اینپوت هایی که مقدار درونشان سر ریز است - در زمانی ک موس روی نود می رود
 $(function(){
   $('.new-action-type').hover(function() {
     var inplength = $(this).val().length;
     var new_width = (inplength + 1) * 5 ;
     if(new_width > 130){
       var new_width_px = new_width + 'px';
       $(this).css('width',new_width_px);
     }
   }
   , function() {
     $(this).css('width','130px');
   })
 });

// رویداد فوکوس روی یک نود = استایل
 $(function(){
   $('.new-action-type').hover(function() {
     var id =$(this).attr('data-id') ;
     var el =  '#node-val-'+id;
     $(el).focus();
     $(el).addClass('node-focus');

    }
   , function() {
     var id =$(this).attr('data-id') ;
     var el =  '#node-val-'+id;
     //$(el).blur();
     $(el).removeClass('node-focus');
   })
 });

 // جهت حذف فوکوس از روی نود
 $('#content').click(function(){
    $('.new-action-type').blur();

 });



  // افکت متریال دیزاین کلیک
  $("button").click(function (e) {

  // Remove any old one
  $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");


 // Make it round!
  if(buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;


  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});


});

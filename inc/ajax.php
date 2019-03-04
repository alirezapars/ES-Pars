<?php
include_once '../config.php';


if( isset($_POST['data']['action']) ){

    $action = $_POST['data']['action'];


    // if($action == 'project-new'){
    //
    // }


    // درج + بروز رسانی اتریبیوت اول
    if($action=='new-attr-first' || $action=='update-attr-first'){
      $atrr_val = trim($_POST['data']['atrr_val']);
      $data_id  = $_POST['data']['data_id'];
      attr_new_fisrt($con,$action,$atrr_val,$data_id);
    }//END if new-attr-first



    // اگر درخواست اکشت موارد در حوزه درج و بروز رسانی بود
    if($action=='add-node' || $action=='update-node' || $action=='delete-node'){

        $parent_id  = $_POST['data']['parent_id'];
        $content  = $_POST['data']['content'];
        $data_id  = $_POST['data']['data_id'];
        $type  = $_POST['data']['type'];

        action_node($con,$action,$parent_id,$content,$data_id,$type);

    }











}// END if action




// تابع درج و بروز رسانی اولین اتریبیوت
function attr_new_fisrt($con,$action,$atrr_val,$data_id){
  //echo $action;

  if($action=='new-attr-first'){
    $query = "INSERT INTO pars_tree SET content='{$atrr_val}' , position='atr'  ";
    $action_new = 'update-attr-first' ;

  }else if($action=="update-attr-first" AND empty($atrr_val)==false){

    $query = "UPDATE pars_tree SET content='{$atrr_val}' WHERE ID='{$data_id}' ";
    $id = $data_id;
    $action_new = 'update-attr-first';

  }else if($action=='update-attr-first' AND empty($atrr_val)==true ){
    //echo 'true';
    $query = "DELETE FROM pars_tree WHERE ID='{$data_id}' ";
    $id = 0;
    $action_new = 'new-attr-first' ;
  }
  $reslut = mysqli_query($con,$query);

  // اگر اکشن سوال جدید بود
  if($action=='new-attr-first' ){
    $id = mysqli_insert_id($con); // برگشت آیدی آزمون جدید
  }//if action question-new



  $status = 'true';
  //echo $action_new;
  $data = array(
    'action'      => $action_new,
    'id'          => $id,
    'content'     => $atrr_val,
    'status'      => $status,
  );

  echo json_encode($data);

}// END function attr_new_fisrt







// تابع مدیریت نود ها - درج - بروز رسانی - حذف
function action_node($con,$action,$parent_id,$content,$data_id,$type){
  if($parent_id==''){
    $parent_id = 0 ;
  }
  if($action=='add-node'){
    $query = "INSERT INTO pars_tree SET parent_id='{$parent_id}' , content='{$content}' , position='{$type}'  ";
    //$action_new = 'add-node';

  }else if($action=='update-node' ){

    $query = "UPDATE pars_tree SET content='{$content}' WHERE ID='{$data_id}' ";
    $id = $data_id;
    //$action_new = 'update-node';

  }else if($action=='delete-node' ){
    $query = "DELETE FROM pars_tree WHERE ID='{$data_id}' ";
    $id = $data_id;
  }


  $reslut = mysqli_query($con,$query);
// اگر اکشن سوال جدید بود
  if($action=='add-node' ){
    $id = mysqli_insert_id($con); // برگشت آیدی آزمون جدید
  }//if action question-new

   $status = 'true' ;

if($action=='add-node'){
  // تنظیم فعال بودن یا غیرفعال بودن گزینه منو
  // true - غیرفعال کردن
  // false- فعال کردن
  if($parent_id==0 AND $type=='atr'){
    $action_attr  = 'true';
    $action_value = 'false';
    $action_con   = 'true';
    $action_del   = 'true';

    //-----------------
    $up_action    = 'false';
    $up_parent_id = '';
    $up_ac_val    = '';
    $up_ac_atr    = '';
    $up_ac_con    = '';
    $up_ac_del    = '';

  // اگر افزودن سوال بود
  }elseif ($type=='atr') {
    $action_attr  = 'true';
    $action_value = 'false';
    $action_con   = 'true';
    //if($parent_id!=0){
      $action_del   = 'false'; // فعال کردن حذف نود
    //}else {
    //  $action_del   = 'true';
    //}

    //-----------------
    $up_action    = 'true';
    $up_parent_id = $parent_id;
    $up_ac_val    = 'true';
    $up_ac_atr    = 'true';
    $up_ac_con    = 'true';
    $up_ac_del    = 'true';

  // اگر افزودن گزینه بود
  }elseif ($type=='val') {
    $action_attr  = 'false';
    $action_value = 'true';
    $action_con   = 'false';
    $action_del   = 'false';

    //-----------------
    $up_action    = 'true';
    $up_parent_id = $parent_id;
    $up_ac_atr    = 'true';
    $up_ac_val    = 'false';
    $up_ac_con    = 'true';
    $up_ac_del    = 'true';

  // اگر افزودن نتیجه بود
  }else if($type=='con') {
    $action_value = 'true';
    $action_attr  = 'true';
    $action_con   = 'true';
    $action_del   = 'false';

    // در صورتی که نود اضافه شده - نود نتیجه بود
    // می بایست نود مادر که - val
    // می باشد ایتم های منوی آن تغییر کند
    $up_action     = 'true' ;
    $up_parent_id  = $parent_id;
    $up_ac_val     = 'true';
    $up_ac_atr     = 'true';
    $up_ac_con     = 'true';
    $up_ac_del     = 'true';

  }else {
    $action_value = '';
    $action_attr  = '';
    $action_con   = '';

    //-----------------
    $up_action    = 'false';
    $up_parent_id = '';
    $up_ac_val    = '';
    $up_ac_atr    = '';
    $up_ac_con    = '';
    $up_ac_del    = '';
  }// END if menu-action
}else {
  $action_value = '';
  $action_attr  = '';
  $action_con   = '';
  $action_del   = '';

  //-----------------
  $up_action    = 'false';
  $up_parent_id = '';
  $up_ac_val    = '';
  $up_ac_atr    = '';
  $up_ac_con    = '';
  $up_ac_del    = '';
}// END if action add-node


// تغییرات انجام شده در کنترلر های نود بعداز حذف
if($action=='delete-node' ){

  $query = "SELECT * FROM pars_tree WHERE ID='{$parent_id}'  ";
  $result = mysqli_query($con, $query);
  $data = mysqli_fetch_object($result);
  $position =  $data->position;

  switch ($position) {

    case 'atr':
      $up_action    = 'true';
      $up_parent_id = $parent_id;
      $up_ac_val    = 'false';
      $up_ac_atr    = 'true';
      $up_ac_con    = 'true';
      $up_ac_del    = 'false';
      break;

    case 'val':
      $up_action    = 'true';
      $up_parent_id = $parent_id;
      $up_ac_atr    = 'false';
      $up_ac_val    = 'true';
      $up_ac_con    = 'false';
      $up_ac_del    = 'false';
      break;



  }

 




}//END f action delete-node






  $data = array(
    'action'      => $action,
    'id'          => $id,
    'parent_id'   => $parent_id,
    'content'     => $content,
    'type'        => $type,
    'status'      => $status,
    'action_value'=> $action_value,
    'action_attr' => $action_attr,
    'action_con'  => $action_con,
    'action_del'  => $action_del,
    'up_action'   => $up_action,
    'up_parent_id'=> $up_parent_id,
    'up_ac_val'   => $up_ac_val,
    'up_ac_atr'   => $up_ac_atr,
    'up_ac_con'   => $up_ac_con,
    'up_ac_del'   => $up_ac_del
  );

  echo json_encode($data);







}// END function action_node











 ?>

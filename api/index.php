<?php
include_once '../config.php';





if(isset($_GET['action']) AND !empty($_GET['action']) ){
  $action = $_GET['action'];

  // درخواست نمایش داده لیست سیستم های خبره
  if($action=='systems'){
     get_systems();
  }
  
  if($action=='systems_list'){
     get_systems_list();
  }

  // درخواست دریافت نود ها
  if($action=='system' AND isset($_GET['id']) AND !empty($_GET['id'])){
    $attr_id = $_GET['id'];

    get_nodes($attr_id);



  }







}


// تابع نمایش داده های جدول سیستم های خبره
function get_systems_list(){
  global $con;
  $data = array();

  $query = "SELECT * FROM pars_systems";
  $result = mysqli_query($con,$query);
  while ($row = mysqli_fetch_array($result)) {
      $data[] = array(
        'ID'      => $row['ID'],
        'name'    => $row['name'],
        'atrr_id' => $row['atrr_id'],
      );
  }

  echo json_encode($data);

}// END function get_systems_list


// تابع نمایش داده های جدول سیستم های خبره
function get_systems(){
  global $con;
  $data = array();

  $query = "SELECT * FROM pars_systems";
  $result = mysqli_query($con,$query);
  while ($row = mysqli_fetch_array($result)) {
	  
	 $items[] = array(
       'ID'      => $row['atrr_id'],
       'position'=> 'val', //first is question
       'content' => $row['name'],
      );
  }
  
   $data = array(
       'ID'      => '',
       'position'=> 'atr',
       'content' => 'سیستم خبره خود را انتخاب کنید',
       'items'  =>  $items,
      );

  echo json_encode($data);

}// END function get_systems









// تابع دریافت داده های نود
function get_nodes($attr_id){
  global $con ;
  $data = array();



  $query = "SELECT * FROM pars_tree WHERE ID='{$attr_id}' ";
  $result_parent = mysqli_query($con,$query);
  if ($row_parent = mysqli_fetch_array($result_parent) ) {


      if($row_parent['position']=='atr'){

       $data = array(
         'ID'      =>$row_parent['ID'],
         'position'=>$row_parent['position'],
         'content' =>$row_parent['content'],
         'items'  => get_node_items($row_parent['ID']),
       );

     // اگر آیدی دریافت شده نوع آن از نوع - گزینه بود
     }elseif ($row_parent['position']=='val') {

       $query_child = "SELECT * FROM pars_tree WHERE parent_id='{$row_parent['ID']}' ";
       $result_child = mysqli_query($con,$query_child);

       while ($row_child = mysqli_fetch_assoc($result_child)) {
           // اگر فرزند - آیدی آمده شده که از نوع گزینه است، سوال بود - مستقیم فرزندان آن را نمایش بده
           if($row_child['position']=='atr'){
             $data = array(
               'ID'      =>$row_child['ID'],
               'position'=>$row_child['position'],
               'content' =>$row_child['content'],
               'items'  => get_node_items($row_child['ID'])
             );

           // اگر آیدی دریافت شده - فرزندش از نوع نتیجه بود - مستقیم نتیجه را نشان بده
           }else if ($row_child['position']=='con') {

             $data = array(
               'ID'      => '',
               'position'=> 'con',
               'content' => 'نتیجه نهایی',
               'items'   => get_node_items($row_parent['ID']),
             );
           }// if

       }// while



     }else {
       $data = array(
         'ID'      =>$row_parent['ID'],
         'position'=>$row_parent['position'],
         'content' =>$row_parent['content'],
         'items'  => get_node_items($row_parent['ID']),
       );
     }// if val


  }

  // $query_child = "SELECT * FROM pars_tree WHERE parent_id='{$row_parent['ID']}' ";
  // $result_child = mysqli_query($con,$query_child);
  //
  // while ($row_child = mysqli_fetch_assoc($result_child)) {
  //     $data['items'][] = array(
  //       'ID'        => $row_child['ID'],
  //       'position'  => $row_child['position'],
  //       'content'   => $row_child['content'],
  //     );
  // }





  echo json_encode($data);

}


function get_node_items($parent_id){

  global $con;
  $query_child = "SELECT * FROM pars_tree WHERE parent_id='{$parent_id}' ";
  $result_child = mysqli_query($con,$query_child);

  while ($row_child = mysqli_fetch_assoc($result_child)) {

      $data[] = array(
        'ID'        => $row_child['ID'],
        'position'  => $row_child['position'],
        'content'   => $row_child['content'],
      );


  }


  return $data;

}








 ?>

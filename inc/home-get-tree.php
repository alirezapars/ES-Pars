<?php


// تابع ایجاد درخت
function get_tree($parent = 0, $user_tree_array = '') {
  global $con;



  if (!is_array($user_tree_array))
  $user_tree_array = array();

  $sql = "SELECT * FROM pars_tree WHERE 1 AND parent_id = $parent ORDER BY ID ASC";
  $result=$con->query($sql);
  if (mysqli_num_rows($result) > 0)
  {
     // while ($get_row = mysqli_fetch_array($result)) {
     //   # code...
     //   }

     // $tree_count_atr = 0;
     // $tree_count_val = 0;
     // $tree_count_con = 0;

     while ($row =$result->fetch_object())
     {

       if($row->position == 'atr'){

        if(have_child($row->ID,'val') > 0 ){
          $get_action_attr='true';
          $get_action_value='false';
          $get_action_con='true';
          $get_action_del='true';
        }else {
          $get_action_attr='true';
          $get_action_value='false';
          $get_action_con='true';
          $get_action_del='false';
        }



       }elseif ($row->position == 'val') {


         if(have_child($row->ID,'atr') > 0 AND have_child($row->ID,'con') ==0 ){
             $get_action_attr='true';
             $get_action_value='true';
             $get_action_con='true';
             $get_action_del='true';
         }else if(have_child($row->ID,'atr') == 0 AND have_child($row->ID,'con') > 0){
             $get_action_attr='true';
             $get_action_value='true';
             $get_action_con='true';
             $get_action_del='true';
         }else {
             $get_action_attr='false';
             $get_action_value='true';
             $get_action_con='false';
             $get_action_del='false';
         }

       }elseif ($row->position == 'con') {


         $get_action_attr='true';
         $get_action_value='true';
         $get_action_con='true';
         $get_action_del='false';
       }else {
         $get_action_attr='';
         $get_action_value='';
         $get_action_con='';
         $get_action_del='';
       }

    $px = "'px'";

     //$user_tree_array[] = "<ul>";
     $user_tree_array[] = '
     <li class="xx-node-id-'.$row->ID.'">
     <ul id="child-of-'.$row->parent_id.' node-id-'.$row->ID.'" class="x-node-id-'.$row->ID.'" >
     ';


      $user_tree_array[] = '
      <li class="child-of-'.$row->parent_id.' node-id-'.$row->ID.' ">

      <div class="o-'.$row->position.'">
      <input type="text" id="node-val-'.$row->ID.'" class="new-action-type" data-id="'.$row->ID.'" data-type-node="'.$row->position.'" data-parent-id="'.$row->parent_id.'" data-action-attr="'.$get_action_attr.'" data-action-value="'.$get_action_value.'" data-action-con="'.$get_action_con.'" data-action-del="'.$get_action_del.'"  value="'.$row->content.'"  placeholder=" مقدار" readonly="readonly">
      <span class="show-node-id"><i class="fa fa-caret-left"></i>'.$row->ID.'</span>
      </div>

      </li>
      ';
      $user_tree_array = get_tree($row->ID, $user_tree_array);



     $user_tree_array[] = "</ul></li>";
}


  }
    return $user_tree_array;
}// END function get_tree


//
function have_child($node_id,$node_type){
  global $con;
  $query = "SELECT ID,parent_id,position FROM pars_tree WHERE parent_id='{$node_id}' AND position='{$node_type}' ORDER BY ID ASC ";
  $result= mysqli_query($con,$query);
  $rowcount  = mysqli_num_rows($result);
  return($rowcount);
}


/*****************************************/
// نمایش درخت
$res = get_tree();
foreach ($res as $r)
{
   echo  $r;
}









?>

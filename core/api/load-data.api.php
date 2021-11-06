<?php

$output = [];

 try {
     include __root.CORE."mgc/load_catalog.php";
     $mgc = new MGC_catalog();
     $categories = $mgc->loadData("categories");
     $products = $mgc->loadData("products");
     $output += ["MGS auth"=>"OK"];
     $output += ["LOAD"=>["Categories"=>count($categories), "Products"=>count($products['records'])]];
 } catch (Err $e) {
     exit(json_encode(["Error"=>$e->getMessage()], JSON_OPTIONS));
 }

try {
    include __root.DB."init.db.php";
    $db = new DBInit(__dbhost, __dbuser, __dbpass, __dbname);
    $db->init_tables();
    $c_cnt = $db->saveData("categories", $categories);
    $p_cnt = $db->saveData("products", $products['records']);
    $output += ["DB init"=>"OK"];
    $output += ["SAVE"=>["Categories"=>"$c_cnt", "Products"=>"$p_cnt"]];
} catch (Err $e) {
    exit(json_encode(["Error"=>$e->getMessage()], JSON_OPTIONS));
}

exit(json_encode($output, JSON_OPTIONS));

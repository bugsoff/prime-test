<?php

try {
    include __root.DB."get-data.db.php";
    $db = new DBget(__dbhost, __dbuser, __dbpass, __dbname);
    $data =$db->getCategories();
} catch (Err $e) {
    exit(json_encode(["Error"=>$e->getMessage()], JSON_OPTIONS));
}

exit(json_encode($data, JSON_OPTIONS));

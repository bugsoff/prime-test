<?php

include "db.php";

class DBget extends Database
{
    public function getCategories($cid=null)
    {
        $sql = "SELECT * FROM `categories`".($cid?" WHERE `categoryId`=$cid":"");
        return $this -> exec_query($sql);
    }

    public function getProductsCat(int $cid, int $start=0)
    {
        $sql = "SELECT `prod_id`, `Name`, `InStock`, `Price`, `Picture` FROM `products` WHERE `categoryId`=$cid LIMIT $start, ".__prd_per_page;
        return $this -> exec_query($sql);
    }

    public function getProduct(int $pid)
    {
        $sql = "SELECT * FROM `products` WHERE `prod_id`=$pid";
        return $this -> exec_query($sql);
    }
}

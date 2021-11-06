<?php

include "mgc.php";

class MGC_catalog extends MGC
{
    const api_uri = [
        "categories" => "categories",
        "products" => "products",
    ];
    
    public function __construct()
    {
        parent::__construct();
    }

    public function loadData($type)
    {
        $receive = $this->query(MGC_catalog::api_uri[$type]);
        if ($receive['status']==='success') {
            return $receive['data'];
        } else {
            throw new Err($receive['message']??"Сервер MGC вернул ошибку");
        }
    }
}

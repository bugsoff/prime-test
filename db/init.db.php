<?php

include "db.php";

class DBInit extends Database
{
    public function __construct($server, $user, $pass, $dbname)
    {
        parent::__construct($server, $user, $pass, $dbname);
    }

    public function init_tables()
    {
        $sql = "CREATE OR REPLACE TABLE `categories` (
                `id` INT NOT NULL UNIQUE,
                `domain_id` INT NOT NULL,
                `categoryId` INT NOT NULL PRIMARY KEY,
                `parentId` INT NOT NULL,
                `name` VARCHAR(255) NOT NULL,
                `totalProducts` INT NOT NULL,
                `Params` VARCHAR(8190),
                `translit_name` VARCHAR(255) NOT NULL)
                engine='Aria';";
        $this->exec_query($sql);
        $sql = "CREATE OR REPLACE TABLE `products` (
                `id` INT NOT NULL UNIQUE,
                `domain_id`INT NOT NULL,
                `prod_id` INT NOT NULL PRIMARY KEY,
                `GroupId` INT,
                `categoryId` INT NOT NULL,
                `parentId` BIGINT NOT NULL,
                `Name` VARCHAR(255) NOT NULL,
                `Vendor` VARCHAR(255),
                `Model` VARCHAR(255),
                `TypePrefix` VARCHAR(255),
                `DealerID` INT NOT NULL,
                `InStock`  INT NOT NULL,
                `Available` CHAR(5) NOT NULL,
                `Downloadable` CHAR(5) NOT NULL,
                `Price` VARCHAR(16) NOT NULL,
                `ItemType` VARCHAR(255) NOT NULL,
                `Category` VARCHAR(255) NOT NULL,
                `Picture` VARCHAR(1024),
                `Annotation` TEXT,
                `TermsConditions` VARCHAR(1024),
                `ActivationRules` VARCHAR(1024),
                `TermsOfUse` VARCHAR(1024),
                `Params` VARCHAR(8190),
                `type` VARCHAR(16) NOT NULL,
                `nominal` VARCHAR(16) NOT NULL,
                `nominal_unit` VARCHAR(255) NOT NULL,
                `min_price` VARCHAR(16),
                `max_price` VARCHAR(16)) 
                engine='Aria';";
        $this->exec_query($sql);
    }

    public function saveData($table, $data)
    {
        $count=0;
        if ($data) {
            foreach ($data as $category) {
                $sql = "INSERT INTO `$table` SET";
                foreach ($category as $field => $value) {
                    if (isset($value) && $value!=='') {
                        $sql .= " `$field`='".
                            $this->clear(
                                is_array($value)
                                    ?json_encode($value, JSON_NUMERIC_CHECK|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_HEX_QUOT)
                                    :$value
                            ).
                        "',";
                    }
                }
                $count += $this->exec_query(substr($sql, 0, -1));
            }
        }
        return $count;
    }
}

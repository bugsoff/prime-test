<?php

$data=[
    'title'=>"Prime Test",
    'version'=>__version,
    'project'=>__project,
    'styles' => ["/styles.css", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"],
    'scripts' => ["/main.js"],
];

include __root.GUI."gui.php";
include __root.GUI.PUB."main.gui.php";
include __root.GUI."page.gui.php";

?>


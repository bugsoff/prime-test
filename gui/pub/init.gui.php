<?php

function content($data=null)
{
    ?>
<section class="container" id="main">
    <h1 class="display-4 my-4" id="title">Инициализация базы данных</h1>
    <div class="content-align-center" id="result">
        <button type="button" class="btn btn-lg btn-outline-primary" id="init">Загрузить данные MGC-Loyality</button>
    </div>
</section>
<?php
    footer($data['project'].' v'.$data['version']);
}

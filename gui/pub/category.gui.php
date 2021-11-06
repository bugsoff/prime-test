<?php

function content($data=null)
{
    ?>
<section class="container" id="main"
    data-prd_per_page="<?=__prd_per_page?>">
    <div class="row">
        <div class="col-11">
            <h1 class="display-4 my-4" id="title"></h1>
        </div>
        <div class="col-1 display-5 text-center" id="close">
            &times;
        </div>
    </div>
</section>
<?php
    footer($data['project'].' v'.$data['version']);
}

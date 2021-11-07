<?php

function styles($styles)
{
    if ($styles??false) {
        foreach ($styles as $stylesheet) { ?>
<link rel="stylesheet" href="<?=$stylesheet?>"><?php }
    }
}

function scripts($scripts)
{
    if ($scripts??false) {
        foreach ($scripts as $script) { ?><script type="module"
    src="<?=$script?>">
</script><?php }
    }
}


function footer($text)
{
    ?>
<div style="height: 32px;"> </div>
<footer class="container fixed-bottom bg-secondary">
    <code><?=$text?></code>
</footer>
<?php
}

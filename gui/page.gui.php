<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="<?=$page['description']??false?>">
    <title><?=$data['title']??false?>
    </title>
    <?=styles($data['styles']??false)?>
    <?=scripts($data['scripts']??false)?>
</head>

<body>
    <?=content($data);?>
</body>
<html>
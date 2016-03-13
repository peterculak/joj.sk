<?php

$data = file_get_contents('playlist.txt');

$lines = explode("\r", $data);

$items = [];
for ($i = 3; $i <= 174; $i+=2) {
    $line1 = $lines[$i];
    $line2 = $lines[$i+1];

    $bits = explode(',', $line1);

    $items[] = [
        'name' => $bits[1],
        'url' => $line2
    ];
}

$array = array_map(
    function ($item) use ($items) {
        return $item['name'];
    },
    $items
);
$meta = implode(', ', $array);
print($meta);die;
print json_encode($items, JSON_UNESCAPED_SLASHES);die;
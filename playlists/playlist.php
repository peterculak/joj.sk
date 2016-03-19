<?php

$data = file_get_contents('cz_and_sport.m3u');

$lines = explode("\n", $data);

$items = [];
for ($i = 3; $i <= 174; $i+=2) {
    $line1 = $lines[$i];
    $line2 = isset($lines[$i+1]) ? $lines[$i+1] : null;

    if (!$line1) {
        break;
    }

    $bits = explode(',', $line1);

    $items[] = [
        'n' => base64_encode($bits[1]),
        'u' => base64_encode($line2)
    ];
}

//$array = array_map(
//    function ($item) use ($items) {
//        return $item['n'];
//    },
//    $items
//);
//$meta = implode(', ', $array);
//print($meta);die;
print json_encode($items, JSON_UNESCAPED_SLASHES);die;

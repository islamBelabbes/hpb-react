<?php


// Include helpers
include_once __DIR__ . "/../../helpers.php";

$slug = $block["slug"]; // block slug

$att = [
    "music" => array_map(function ($attributes) {
        return [
            "artist-name" => $attributes["artist-name"],
            "song-name" => $attributes["song-name"],
            "song-picture" => $attributes["song-picture"]["url"],
            "song-description" => $attributes["song-description"],
        ];
    }, $attributes["music"]),
];

// Generate the block and echo it
echo hpb_generate_block($slug, $att);
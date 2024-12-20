<?php


// Include helpers
include_once __DIR__ . "/../../helpers.php";

$slug = $block["slug"]; // block slug

$att = [
    "testimonials" => array_map(function ($attributes) {
        return [
            "name" => $attributes["name"],
            "role" => $attributes["role"],
            "testimonial" => $attributes["testimonial"],
            "avatar" => $attributes["avatar"]["url"],
        ];
    }, $attributes["testimonials"]),
];

// Generate the block and echo it
echo hpb_generate_block($slug, $att);
<?php


function hpb_generate_block($slug, $data) {
    // Initialize an empty array to store attributes
    $attributes = [];
    
    // Loop through the data array
    foreach ($data as $key => $value) {
        // Encode the value if it's an array or object to ensure it's properly formatted
        if (is_array($value) || is_object($value)) {
            $value = htmlspecialchars(json_encode($value));
        }
        $attributes[] = "$key=\"$value\"";
    }
    
    // Join all attributes with spaces
    $attr_string = implode(' ', $attributes);
    
    return "
    <hpblock 
        slug=\"$slug\"
        $attr_string
    />
    ";
}
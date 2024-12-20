<?php

/**
 * Plugin Name: headless post block
 * Description: A plugin to generate parsable blocks.
 * Version:     1.0.0
 * Author:      Belabbes Islam
 */

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );


function is_hpb_block($block) {
    $result = array_search("hpb_block", $block["keywords"]);
    return $result !== false;
}

function slug_serialize($slug) {
    return str_replace("/", "-", $slug);
}



function hpb_render_include_template( $template, $attributes, $block ) {
    $slug = slug_serialize($block["slug"]);
    $is_block = is_hpb_block($block);
    
    if ( ! $is_block ) {
        return $template;
    }
    
    $path = __DIR__ . "/blocks/" . $slug . "/block.php";
    
    // make sure the file exists
    if ( ! file_exists( $path ) ) {
        error_log("error generating hpb-block :" . $path . " not found");
        throw new Exception( "block implantation not found" );
    }

    return  __DIR__ . "/blocks/" . $slug . "/block.php";
  }
   
  add_filter( 'lzb/block_render/include_template', 'hpb_render_include_template', 10, 3 );




  add_action('rest_api_init', function () {
    // Existing route to get all categories
    register_rest_route('hpb/api/v1', '/posts', [
        'methods'  => 'GET',
        'callback' => 'hpb_get_posts',
        'permission_callback' => '__return_true', // Public route, adjust if needed
    ]);
});


function hpb_get_posts($request) {
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 5,
        'orderby' => 'date',
        'order' => 'DESC',
    );
    $posts = get_posts($args);
    $data = array();

    foreach ($posts as $post) {
        // Get the rendered content
        $rendered_content = apply_filters('the_content', $post->post_content);

        $data[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $rendered_content,
            'image' => (get_the_post_thumbnail_url($post->ID, 'full') ?: null),
        );
    }
    return $data;
}

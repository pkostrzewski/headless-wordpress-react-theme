<?php
function create_portfolio_post_type() {
    $labels = array(
      'name' => __('Portfolio'),
      'singular_name' => __('Portfolio Item'),
      'menu_name' => __('Portfolio'),
      'name_admin_bar' => __('Portfolio Item'),
      'add_new' => __('Add New'),
      'add_new_item' => __('Add New Portfolio Item'),
      'new_item' => __('New Portfolio Item'),
      'edit_item' => __('Edit Portfolio Item'),
      'view_item' => __('View Portfolio Item'),
      'all_items' => __('All Portfolio Items'),
      'search_items' => __('Search Portfolio'),
      'not_found' => __('No portfolio items found.'),
      'not_found_in_trash' => __('No portfolio items found in Trash.'),
    );
  
    $args = array(
      'labels' => $labels,
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'portfolio'),
      'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
      'show_in_rest' => true, // REST API support
    );
  
    register_post_type('portfolio', $args);
  }
  add_action('init', 'create_portfolio_post_type');

  function add_featured_image_to_rest() {
    register_rest_field( 
        'portfolio',
        'featured_image_url', // Custom field name
        array(
            'get_callback'    => 'get_featured_image_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}

function get_featured_image_url( $object, $field_name, $request ) {
    if ( has_post_thumbnail( $object['id'] ) ) {
        $img_array = wp_get_attachment_image_src( get_post_thumbnail_id( $object['id'] ), 'full' );
        return $img_array[0]; // Return the image URL
    }
    return false; // No thumbnail
}

add_action( 'rest_api_init', 'add_featured_image_to_rest' );
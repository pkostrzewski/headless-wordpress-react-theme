<?php
// Rejestracja Custom Post Type 'services'
function create_services_post_type() {
    $labels = array(
      'name' => __('Services', 'sample-react-theme'),
      'singular_name' => __('Service', 'sample-react-theme'),
      'menu_name' => __('Services', 'sample-react-theme'),
      'name_admin_bar' => __('Service', 'sample-react-theme'),
      'add_new' => __('Add New', 'sample-react-theme'),
      'add_new_item' => __('Add New Service', 'sample-react-theme'),
      'new_item' => __('New Service', 'sample-react-theme'),
      'edit_item' => __('Edit Service', 'sample-react-theme'),
      'view_item' => __('View Service', 'sample-react-theme'),
      'all_items' => __('All Services', 'sample-react-theme'),
      'search_items' => __('Search Services', 'sample-react-theme'),
      'not_found' => __('No services found.', 'sample-react-theme'),
      'not_found_in_trash' => __('No services found in Trash.', 'sample-react-theme'),
    );
  
    $args = array(
      'labels' => $labels,
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'services'),
      'supports' => array('title', 'editor', 'excerpt'),
      'show_in_rest' => true,
    );
  
    register_post_type('services', $args);
}
add_action('init', 'create_services_post_type');
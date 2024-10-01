<?php
// Post Types
require get_template_directory() . '/inc/post-types/services.php';
require get_template_directory() . '/inc/post-types/portfolio.php';  

// Menu registration
function register_my_menus() {
    register_nav_menus(
        array(
            'primary-menu' => __('Primary Menu'),
        )
    );
}
add_action('init', 'register_my_menus');

// Theme config
function mytheme_setup() {
    add_theme_support('post-thumbnails', array('post','services', 'portfolio'));
}
add_action('after_setup_theme', 'mytheme_setup');

// Endpoints
require get_template_directory() . '/inc/endpoints/site-title.php';  
require get_template_directory() . '/inc/endpoints/menus.php';  

// Meta boxes registration
require get_template_directory() . '/inc/custom-meta-boxes/custom-meta-boxes.php';  

// Allow SVG uploads
function custom_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml'; // Allow SVG file uploads
    return $mimes;
}
add_filter('upload_mimes', 'custom_mime_types');

// Enqueue custom styles for the WordPress dashboard with file versioning
function enqueue_admin_styles() {
    $style_path = get_template_directory() . '/inc/dashboard/styles/metaboxes.css';
    $style_uri = get_template_directory_uri() . '/inc/dashboard/styles/metaboxes.css';
    $version = file_exists($style_path) ? filemtime($style_path) : '1.0.0'; // Jeśli plik istnieje, pobierz czas modyfikacji

    // Enqueue the CSS file with dynamic version
    wp_enqueue_style('custom-admin-metabox-styles', $style_uri, array(), $version );
}
add_action('admin_enqueue_scripts', 'enqueue_admin_styles');

?>

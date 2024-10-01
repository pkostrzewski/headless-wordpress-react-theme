<?php
// Endpoint do pobierania tytułu strony
function get_site_title() {
    return get_bloginfo('name'); // Pobiera nazwę strony
}

add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/site-title', array(
        'methods' => 'GET',
        'callback' => 'get_site_title',
        'permission_callback' => '__return_true',
    ));
});
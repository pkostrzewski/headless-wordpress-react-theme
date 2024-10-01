<?php
// Endpoint do pobierania menu
function get_primary_menu() {
    $menu_name = 'primary-menu'; 
    $locations = get_nav_menu_locations();
    $menu_id = $locations[$menu_name]; 
    $menu_items = wp_get_nav_menu_items($menu_id);

    $menu_array = [];
    foreach ($menu_items as $item) {
        $menu_array[] = [
            'id' => $item->ID,
            'title' => $item->title,
            'url' => $item->url,
        ];
    }
    return new WP_REST_Response($menu_array, 200);
}

add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/primary-menu', array(
        'methods' => 'GET',
        'callback' => 'get_primary_menu',
        'permission_callback' => '__return_true',
    ));
});
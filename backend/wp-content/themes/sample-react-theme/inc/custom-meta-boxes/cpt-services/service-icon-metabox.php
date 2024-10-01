<?php
// Add a metabox to the 'services' Custom Post Type
function add_service_icon_metabox() {
    add_meta_box(
        'service_icon_metabox', // Metabox ID
        __('Service Icon', 'sample-react-theme'), // Metabox title
        'render_service_icon_metabox', // Callback function to render the metabox
        'services', // Post type
        'normal', // Location of the metabox
        'high' // Priority
    );
}
add_action('add_meta_boxes', 'add_service_icon_metabox');

// Render the metabox content
function render_service_icon_metabox($post) {
    // Retrieve saved value for the service icon
    $service_icon = get_post_meta($post->ID, '_service_icon', true);

    // Nonce field for security
    wp_nonce_field('save_service_icon', 'service_icon_nonce');

    echo '<div class="service-icon">';
        // Input field to upload the service icon
        echo '<label for="service_icon">' . __('Upload Service Icon (SVG, PNG, JPG, JPEG, WebP)', 'sample-react-theme') . '</label>';
        
        // Add a div for the preview (either show the icon or leave it empty initially)
        echo '<div id="service_icon_preview" style="margin-top: 10px;">';
            if ($service_icon) {
                echo '<img src="' . esc_url($service_icon) . '" style="max-width: 50px; height: auto;" />';
            }
        echo '</div>';
        
        // Hidden input to store the selected icon's URL
        echo '<input type="hidden" id="service_icon" name="service_icon" value="' . esc_attr($service_icon) . '" />';
        
        // Button to trigger Media Library
        echo '<input type="button" class="button" id="service_icon_button" value="' . ($service_icon ? __('Change Service Icon', 'sample-react-theme') : __('Upload Icon', 'sample-react-theme')) . '" />';
    echo '</div>';
?>
    <script>
        jQuery(document).ready(function($) {
            var mediaUploader;

            $('#service_icon_button').click(function(e) {
                e.preventDefault();

                // If the uploader is already open, just reopen it
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }

                // Create a new media frame
                mediaUploader = wp.media({
                    title: '<?php echo esc_js(__('Choose Service Icon', 'sample-react-theme')); ?>',
                    button: {
                        text: '<?php echo esc_js(__('Use this icon', 'sample-react-theme')); ?>'
                    },
                    multiple: false // Only allow one file to be selected
                });

                // When an image is selected, run a callback
                mediaUploader.on('select', function() {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();

                    // Ensure that the attachment URL is valid
                    if (attachment.url) {
                        // Update the hidden input field
                        $('#service_icon').val(attachment.url);

                        // Update the preview div with the new icon
                        $('#service_icon_preview').html('<img src="' + attachment.url + '" style="max-width: 50px; height: auto;" />');

                        // Update the button text
                        $('#service_icon_button').val('<?php echo esc_js(__('Change Service Icon', 'sample-react-theme')); ?>');
                    }
                });

                // Open the uploader dialog
                mediaUploader.open();
            });

            // Automatically display the current icon on load if available
            var currentIcon = $('#service_icon').val();
            if (currentIcon) {
                $('#service_icon_preview').html('<img src="' + currentIcon + '" style="max-width: 50px; height: auto;" />');
            }
        });
    </script>
<?php
}

// Save the service icon when the post is saved
function save_service_icon_meta($post_id) {
    // Check if nonce is set
    if (!isset($_POST['service_icon_nonce'])) {
        return;
    }

    // Verify the nonce
    if (!wp_verify_nonce($_POST['service_icon_nonce'], 'save_service_icon')) {
        return;
    }

    // Check for autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check the user's permissions
    if (isset($_POST['post_type']) && 'services' == $_POST['post_type']) {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    // Save the icon URL
    if (isset($_POST['service_icon'])) {
        update_post_meta($post_id, '_service_icon', esc_url_raw($_POST['service_icon']));
    }
}
add_action('save_post', 'save_service_icon_meta');

// Add custom column to services post type
function add_service_icon_column($columns) {
    $new_columns = array();

    // Reorder columns to place the new 'Icon' column before 'Title'
    foreach ($columns as $key => $title) {
        if ($key == 'cb') {
            $new_columns['cb'] = $title;
            $new_columns['service_icon'] = __('Icon', 'sample-react-theme');
        } else {
            $new_columns[$key] = $title;
        }
    }

    return $new_columns;
}
add_filter('manage_services_posts_columns', 'add_service_icon_column');

// Render the content for the custom 'Icon' column
function render_service_icon_column($column, $post_id) {
    if ($column == 'service_icon') {
        $service_icon = get_post_meta($post_id, '_service_icon', true);

        if ($service_icon) {
            // Display the icon with a maximum width of 44px
            echo '<img src="' . esc_url($service_icon) . '" />';
        } else {
            // Optionally show a placeholder or text if no icon is set
            echo __('No Icon', 'sample-react-theme');
        }
    }
}
add_action('manage_services_posts_custom_column', 'render_service_icon_column', 10, 2);

// Dodanie service_icon do REST API
function add_service_icon_to_rest() {
    register_rest_field('services', 'service_icon', array(
        'get_callback'    => 'get_service_icon_for_api',
        'update_callback' => null,
        'schema'          => null,
    ));
}
add_action('rest_api_init', 'add_service_icon_to_rest');

// Funkcja zwracająca ikonę dla API
function get_service_icon_for_api($object, $field_name, $request) {
    // Pobierz wartość meta _service_icon dla danego postu
    $service_icon = get_post_meta($object['id'], '_service_icon', true);
    
    // Zwróć URL do ikony lub pustą wartość, jeśli nie ustawiono ikony
    return $service_icon ? esc_url($service_icon) : '';
}
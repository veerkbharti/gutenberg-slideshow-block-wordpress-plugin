<?php
/*
Plugin Name: Gutenberg Slideshow
Description: This is an awesome WordPress plugin!
Version: 1.0
Author: Veer Kunwer Bharti
*/

function gutenberg_slideshow_script()
{
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_enqueue_script(
        'example-editor-scripts',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks'),
        $asset_file['dependencies'],
        $asset_file['version']
    );
}
add_action('enqueue_block_editor_assets', 'gutenberg_slideshow_script');


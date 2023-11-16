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
        'slideshow-editor-scripts',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks'),
        $asset_file['dependencies'],
        $asset_file['version']
    );
}
add_action('enqueue_block_editor_assets', 'gutenberg_slideshow_script');


function gutenberg_slideshow_frontend_styles()
{
    wp_enqueue_style(
        'slideshow-frontend-styles',
        plugins_url('public/css/style.css', __FILE__),
        array(),
        time(),
    );

    wp_enqueue_script(
        'slideshow-frontend-scripts',
        plugins_url('public/js/script.js', __FILE__),
        array(),
        time(),
        true
    );
}
add_action('wp_enqueue_scripts', 'gutenberg_slideshow_frontend_styles');

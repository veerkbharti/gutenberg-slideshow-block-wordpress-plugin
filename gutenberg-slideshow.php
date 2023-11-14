<?php
/*
Plugin Name: Gutenberg Slideshow
Description: This is an awesome WordPress plugin!
Version: 1.0
Author: Veer Kunwer Bharti
*/

function gutenberg_slideshow_script()
{
    // Enqueue scripts
    wp_enqueue_script('gutenberg-slideshow-block', plugins_url('js/block.js', __FILE__), array('wp-blocks'));

    register_block_type('gutenberg-slideshow-block/slideshow', array(
        'editor_script' => 'gutenberg-slideshow-block',
    ));
}

add_action('init', 'gutenberg_slideshow_script');






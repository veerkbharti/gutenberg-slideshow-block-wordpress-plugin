<?php
/*
Plugin Name: Gutenberg Slideshow
Description: This is an awesome WordPress plugin!
Version: 1.0
Author: Veer Kunwer Bharti
*/

function custom_slideshow_script()
{
    echo "Hello World!!";
}

add_action('init', 'custom_slideshow_script');






<?php
/**
 * Plugin Name: Tailor Sahab Backend
 * Description: Custom backend for Tailor Sahab App, Replacing Supabase with WordPress REST API.
 * Version: 1.0.0
 * Author: Tailor Sahab
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('TAILOR_SAHAB_PATH', plugin_dir_path(__FILE__));
define('TAILOR_SAHAB_VERSION', '1.0.0');

// Activation Hook: Create Tables
register_activation_hook(__FILE__, 'tailor_sahab_create_tables');

function tailor_sahab_create_tables() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $version = '1.0.1';

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    // Customers Table
    $table_customers = $wpdb->prefix . 'tailor_customers';
    $sql_customers = "CREATE TABLE $table_customers (
        id varchar(36) NOT NULL,
        name text NOT NULL,
        phone text,
        qameez_length decimal(6,2),
        sleeve_length decimal(6,2),
        chest decimal(6,2),
        neck decimal(6,2),
        waist decimal(6,2),
        gher decimal(6,2),
        collar_size decimal(6,2),
        cuff_width decimal(6,2),
        placket_width decimal(6,2),
        front_pocket text,
        side_pocket text,
        armhole decimal(6,2),
        elbow decimal(6,2),
        daman decimal(6,2),
        bain decimal(6,2),
        shalwar_length decimal(6,2),
        paicha decimal(6,2),
        shalwar_pocket text,
        shalwar_width decimal(6,2),
        notes text,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    dbDelta($sql_customers);

    // Orders Table
    $table_orders = $wpdb->prefix . 'tailor_orders';
    $sql_orders = "CREATE TABLE $table_orders (
        id varchar(36) NOT NULL,
        customer_id varchar(36) NOT NULL,
        order_number varchar(50) NOT NULL,
        description text,
        fabric_details text,
        price decimal(10,2),
        advance_payment decimal(10,2) DEFAULT 0,
        status varchar(20) DEFAULT 'pending' NOT NULL,
        delivery_date date,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    dbDelta($sql_orders);

    // Settings Table (for PIN or other configs)
    $table_settings = $wpdb->prefix . 'tailor_settings';
    $sql_settings = "CREATE TABLE $table_settings (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        setting_key varchar(100) NOT NULL UNIQUE,
        setting_value text NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    dbDelta($sql_settings);

    update_option('tailor_sahab_db_version', $version);
}

// Include API files
require_once TAILOR_SAHAB_PATH . 'includes/api-customers.php';
require_once TAILOR_SAHAB_PATH . 'includes/api-orders.php';
require_once TAILOR_SAHAB_PATH . 'includes/api-pin.php';

// Register REST API routes
add_action('rest_api_init', function () {
    $customers_api = new Tailor_Sahab_Customers_API();
    $customers_api->register_routes();

    $orders_api = new Tailor_Sahab_Orders_API();
    $orders_api->register_routes();

    $pin_api = new Tailor_Sahab_PIN_API();
    $pin_api->register_routes();
});



// Add this at the top of your plugin file, after the plugin header
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        
        // Allow Lovable domains and your production domain
        $allowed_origins = [
            'https://tailor-sahab-app.lovable.app',
            'https://id-preview--1fc339ae-318d-47b5-b0da-59f7c844a176.lovable.app',
        ];
        
        // Also allow any lovable.app subdomain
        if (preg_match('/^https:\/\/.*\.lovable\.app$/', $origin) || 
            preg_match('/^https:\/\/.*\.lovableproject\.com$/', $origin)) {
            header("Access-Control-Allow-Origin: " . $origin);
        } elseif (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: " . $origin);
        }
        
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
        
        return $value;
    });
}, 15);

// Handle preflight OPTIONS requests
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        $origin = get_http_origin();
        if (preg_match('/^https:\/\/.*\.lovable\.app$/', $origin) || 
            preg_match('/^https:\/\/.*\.lovableproject\.com$/', $origin)) {
            header("Access-Control-Allow-Origin: " . $origin);
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With');
            exit(0);
        }
    }
});


<?php
// Load scripts and Stylesheet

function scriptsAndStyles() {
    wp_enqueue_script( 'main', get_template_directory_uri() . getAssets() );
    wp_enqueue_script( 'resources', get_template_directory_uri() . '/resources.js', array() );
}
add_action( 'wp_enqueue_scripts', 'scriptsAndStyles' );

function getAssets() {
    $assets = get_theme_root() . '/urbansneakers/dist/assets.json';

    if (file_exists($assets)) {
        $str  = file_get_contents($assets);
        $json = json_decode($str, true);
        return $json['main']['js'];
    } else {
        die( 'Assets are missing, Please run "npm run build" inside app directory.' );
    }
}

function cptui_register_my_cpts_sneaker() {

    /**
     * Post Type: sneakers.
     */

    $labels = array(
        "name" => __('sneakers', ''),
        "singular_name" => __('sneaker', ''),
        "menu_name" => __('Sneakers', ''),
        "all_items" => __('All Sneakers', ''),
        "add_new" => __('Add Sneaker', ''),
        "add_new_item" => __('Add new Sneaker', ''),
        "edit_item" => __('Edit Sneaker', ''),
        "new_item" => __('New Sneaker', ''),
        "view_item" => __('View Sneaker', ''),
        "view_items" => __('View Sneakers', ''),
        "search_items" => __('Search Sneaker', ''),
        "not_found" => __('No Sneakers Found', ''),
        "not_found_in_trash" => __('No Sneakers Found in Trash', ''),
        "parent_item_colon" => __('Parent Sneaker', ''),
        "featured_image" => __('Featured image for this Sneaker', ''),
        "set_featured_image" => __('Set featured image for this Sneaker', ''),
        "remove_featured_image" => __('Remove feature image for this Sneaker', ''),
        "use_featured_image" => __('Use as featured image for this Sneaker', ''),
        "archives" => __('Sneakers archive', ''),
        "insert_into_item" => __('Insert into Sneaker', ''),
        "uploaded_to_this_item" => __('Uploaded to this Sneaker', ''),
        "filter_items_list" => __('Filter Sneakers list', ''),
        "items_list_navigation" => __('Sneaker list navigation', ''),
        "items_list" => __('Sneakers list', ''),
        "attributes" => __('Sneakers attributes', ''),
        "parent_item_colon" => __('Parent Sneaker', '')
    );

    $args = array(
        "label" => __('sneakers', ''),
        "labels" => $labels,
        "description" => "",
        "public" => true,
        "publicly_queryable" => true,
        "show_ui" => true,
        "show_in_rest" => true,
        "rest_base" => "sneakers",
        "has_archive" => false,
        "show_in_menu" => true,
        "exclude_from_search" => false,
        "capability_type" => "sneakers",
        "map_meta_cap" => true,
        "hierarchical" => false,
        "rewrite" => array(
            "slug" => "sneakers",
            "with_front" => true
        ),
        "query_var" => true,
        "supports" => array(
            "title",
            "editor",
            "thumbnail",
            "excerpt",
            "custom-fields"
        ),
        "taxonomies" => array(
            "category",
            "post_tag"
        )
    );

    register_post_type("sneaker", $args);
}

add_action( 'init', 'cptui_register_my_cpts_sneaker' );


function cptui_register_my_cpts_magazin() {

	/**
	 * Post Type: Magazin.
	 */

	$labels = array(
		"name" => __( 'Magazin', '' ),
		"singular_name" => __( 'Magazin', '' ),
	);

	$args = array(
		"label" => __( 'Magazin', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => true,
		"rest_base" => "magazines",
		"has_archive" => false,
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "magazines",
		"map_meta_cap" => true,
		"hierarchical" => false,
		"rewrite" => array(
		    "slug" => "magazin",
		    "with_front" => true
		),
		"query_var" => true,
		"supports" => array( "title", "editor", "thumbnail", "excerpt", "revisions", "author" ),
		"taxonomies" => array( "category", "post_tag" ),
	);

	register_post_type( "magazin", $args );
}

add_action( 'init', 'cptui_register_my_cpts_magazin' );

function cptui_register_my_taxes_women() {

    /**
     * Taxonomy: Women sizes.
     */

    $labels = array(
        "name" => __('Women sizes', ''),
        "singular_name" => __('women size', '')
    );

    $args = array(
        "label" => __('Women sizes', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Women sizes",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'women',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "women",
        "show_in_quick_edit" => false
    );
    register_taxonomy("women", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_women' );

function cptui_register_my_taxes_men() {

    /**
     * Taxonomy: Men sizes .
     */

    $labels = array(
        "name" => __('Men sizes ', ''),
        "singular_name" => __('Men size', '')
    );

    $args = array(
        "label" => __('Men sizes ', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Men sizes ",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'men',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "men",
        "show_in_quick_edit" => false
    );
    register_taxonomy("men", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_men' );

function cptui_register_my_taxes_kids() {

    /**
     * Taxonomy: Kids sizes.
     */

    $labels = array(
        "name" => __('Kids sizes', ''),
        "singular_name" => __('kids size', '')
    );

    $args = array(
        "label" => __('Kids sizes', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Kids sizes",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'kids',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "kids",
        "show_in_quick_edit" => false
    );
    register_taxonomy("kids", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_kids' );

function cptui_register_my_taxes_adidas_adult() {

    /**
     * Taxonomy: Adidas adult sizes .
     */

    $labels = array(
        "name" => __('Adidas adult sizes ', ''),
        "singular_name" => __('Adidas adult size', '')
    );

    $args = array(
        "label" => __('Adidas adult sizes ', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Adidas adult sizes ",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'adidas_adult',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "adidas_adult",
        "show_in_quick_edit" => false
    );
    register_taxonomy("adidas_adult", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_adidas_adult' );

function cptui_register_my_taxes_adidas_kids() {

    /**
     * Taxonomy: Adidas kids sizes.
     */

    $labels = array(
        "name" => __('Adidas kids sizes', ''),
        "singular_name" => __('Adidas kids size', '')
    );

    $args = array(
        "label" => __('Adidas kids sizes', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Adidas kids sizes",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'adidas_kids',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "adidas_kids",
        "show_in_quick_edit" => false
    );
    register_taxonomy("adidas_kids", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_adidas_kids' );

function cptui_register_my_taxes_color() {

    /**
     * Taxonomy: Colors.
     */

    $labels = array(
        "name" => __('Colors', ''),
        "singular_name" => __('Color', '')
    );

    $args = array(
        "label" => __('Colors', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Colors",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'colors',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "colors",
        "show_in_quick_edit" => false
    );
    register_taxonomy("color", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_color' );

function cptui_register_my_taxes_brand() {

    /**
     * Taxonomy: Brands.
     */

    $labels = array(
        "name" => __('Brands', ''),
        "singular_name" => __('Brand', '')
    );

    $args = array(
        "label" => __('Brands', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Brands",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'brands',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "brands",
        "show_in_quick_edit" => false
    );
    register_taxonomy("brand", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_brand' );

function cptui_register_my_taxes_merchant() {

    /**
     * Taxonomy: Merchants.
     */

    $labels = array(
        "name" => __('Merchants', ''),
        "singular_name" => __('Merchant', '')
    );

    $args = array(
        "label" => __('Merchants', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Merchants",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'merchants',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "merchants",
        "show_in_quick_edit" => false
    );
    register_taxonomy("merchant", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_merchant' );

function cptui_register_my_taxes_use() {

    /**
     * Taxonomy: Uses.
     */

    $labels = array(
        "name" => __('Uses', ''),
        "singular_name" => __('Use', '')
    );

    $args = array(
        "label" => __('Uses', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Uses",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'uses',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "uses",
        "show_in_quick_edit" => false
    );
    register_taxonomy("use", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_use' );

function cptui_register_my_taxes_style() {

    /**
     * Taxonomy: Styles.
     */

    $labels = array(
        "name" => __('Styles', ''),
        "singular_name" => __('Style', '')
    );

    $args = array(
        "label" => __('Styles', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => true,
        "label" => "Styles",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'styles',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "styles",
        "show_in_quick_edit" => false
    );
    register_taxonomy("style", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_style' );

/**
 * Function that will automatically update ACF field groups via JSON file update.
 *
 */
function jp_sync_acf_fields() {

    // vars
    $groups = acf_get_field_groups();
    $sync   = array();

    // bail early if no field groups
    if (empty($groups))
        return;

    // find JSON field groups which have not yet been imported
    foreach ($groups as $group) {

        // vars
        $local    = acf_maybe_get($group, 'local', false);
        $modified = acf_maybe_get($group, 'modified', 0);
        $private  = acf_maybe_get($group, 'private', false);

        // ignore DB / PHP / private field groups
        if ($local !== 'json' || $private) {

            // do nothing

        } elseif (!$group['ID']) {

            $sync[$group['key']] = $group;

        } elseif ($modified && $modified > get_post_modified_time('U', true, $group['ID'], true)) {

            $sync[$group['key']] = $group;
        }
    }

    // bail if no sync needed
    if (empty($sync))
        return;

    if (!empty($sync)) { //if( ! empty( $keys ) ) {

        // vars
        $new_ids = array();

        foreach ($sync as $key => $v) { //foreach( $keys as $key ) {

            // append fields
            if (acf_have_local_fields($key)) {

                $sync[$key]['fields'] = acf_get_local_fields($key);

            }

            // import
            $field_group = acf_import_field_group($sync[$key]);
        }
    }

}
add_action( 'admin_init', 'jp_sync_acf_fields' );

function cptui_register_my_taxes_material() {

    /**
     * Taxonomy: Materials.
     */

    $labels = array(
        "name" => __('Materials', ''),
        "singular_name" => __('Material', '')
    );

    $args = array(
        "label" => __('Materials', ''),
        "labels" => $labels,
        "public" => true,
        "hierarchical" => false,
        "label" => "Materials",
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "query_var" => true,
        "rewrite" => array(
            'slug' => 'materials',
            'with_front' => true
        ),
        "show_admin_column" => false,
        "show_in_rest" => true,
        "rest_base" => "materials",
        "show_in_quick_edit" => false
    );
    register_taxonomy("material", array(
        "sneaker"
    ), $args);
}

add_action( 'init', 'cptui_register_my_taxes_material' );

function cptui_register_my_taxes_labels() {

	/**
	 * Taxonomy: Labels.
	 */

	$labels = array(
		"name" => __( 'Labels', '' ),
		"singular_name" => __( 'Label', '' ),
	);

	$args = array(
		"label" => __( 'Labels', '' ),
		"labels" => $labels,
		"public" => true,
		"hierarchical" => false,
		"label" => "Labels",
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => array(
		    'slug' => 'labels',
		    'with_front' => true,
		),
		"show_admin_column" => false,
		"show_in_rest" => true,
		"rest_base" => "labels",
		"show_in_quick_edit" => false,
	);
	register_taxonomy( "labels", array(
	    "post",
	    "sneaker"
	), $args );
}

add_action( 'init', 'cptui_register_my_taxes_labels' );

function cptui_register_my_taxes_post_labels() {

	/**
	 * Taxonomy: Labels.
	 */

	$labels = array(
		"name" => __( 'Labels', '' ),
		"singular_name" => __( 'Labels', '' ),
	);

	$args = array(
		"label" => __( 'Labels', '' ),
		"labels" => $labels,
		"public" => true,
		"hierarchical" => false,
		"label" => "Labels",
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => array( 'slug' => 'post_labels', 'with_front' => true, ),
		"show_admin_column" => false,
		"show_in_rest" => true,
		"rest_base" => "",
		"show_in_quick_edit" => false,
	);
	register_taxonomy( "post_labels", array( "magazin" ), $args );
}

add_action( 'init', 'cptui_register_my_taxes_post_labels' );

function cleanup_terms() {
    $config = get_theme_root() . '/urbansneakers/config/config.json';

    if (file_exists($config)) {
        $configs = json_decode(file_get_contents($config), true);
        if (term_exists('4US | 35EU | 2UK', 'women')) {
            foreach (array_keys($configs['taxonomy']['size']) as $gender) {
                $terms = get_terms( $gender, array( 'fields' => 'ids', 'hide_empty' => false ) );
                    foreach ( $terms as $value ) {
                        wp_delete_term( $value, $gender );
                    }
            }
        }
    }
}
add_action( 'init', 'cleanup_terms' );

function insert_custom_taxonomy_data() {
    $config = get_theme_root() . '/urbansneakers/config/config.json';

    if (file_exists($config)) {
        $configs = json_decode(file_get_contents($config), true);

        foreach (array_keys($configs['taxonomy']['size']) as $gender) {
            foreach ($configs['taxonomy']['size'][$gender] as $size) {
                if (!term_exists($size['name'], $gender)) {
                    wp_insert_term($size['name'], $gender, array(
                        'description' => 'Size ' . $size['name'],
                        'slug' => $size['slug']
                    ));
                }
            }
        }


        $taxonomies = array_diff(array_keys($configs['taxonomy']), ["size"]);
        foreach ($taxonomies as $taxonomy) {
            foreach ($configs['taxonomy'][$taxonomy] as $item) {
                if (!term_exists($item, $taxonomy)) {
                    wp_insert_term($item, $taxonomy, array(
                        'slug' => $item
                    ));
                }
            }
        }
    }

}

add_action( 'init', 'insert_custom_taxonomy_data' );

function admin_style() {
    wp_enqueue_style( 'admin-styles', get_template_directory_uri() . '/admin.css' );
}

add_action( 'admin_enqueue_scripts', 'admin_style' );

add_theme_support( 'post-thumbnails' );

add_filter( 'intermediate_image_sizes_advanced', false );


function rest_prepare_brand( $response, $object ) {
    if ( $object instanceof WP_Term ) {
      $response->data['acf'] = get_fields( $object->taxonomy . '_' . $object->term_id );
    }
    return $response;
}

add_filter( 'rest_prepare_brand', 'rest_prepare_brand', 10, 2 );

function rest_prepare_merchant( $response, $object ) {
    if ( $object instanceof WP_Term ) {
      $response->data['acf'] = get_fields( $object->taxonomy . '_' . $object->term_id );
    }
    return $response;
}

add_filter( 'rest_prepare_merchant', 'rest_prepare_merchant', 10, 3 );

remove_action( 'template_redirect', 'redirect_canonical' );

function rest_prepare_yoast() {
   register_rest_field( ['page', 'sneaker', 'magazin'],
       'seo',
       [
           'get_callback' => function ($data) {
               if (function_exists('get_field')) {
                   $seo = [];
                   $seo['title'] = get_field('_yoast_wpseo_title', $data['id']);
                   $seo['description'] = get_field('_yoast_wpseo_metadesc', $data['id']);
                   return $seo;
               }
               return [];
           },
           'update_callback' => null,
           'schema' => null
       ]
   );
 };

add_action( 'init', 'rest_prepare_yoast' );

if (defined('WPSEO_VERSION')){
    $instance = WPSEO_Frontend::get_instance();
    remove_action( 'wpseo_head', array( $instance, 'debug_marker' ), 2 );
    remove_action( 'wp_head', array( $instance, 'head' ), 1 );
}

?>

<?php
function insert_relacie() {
    global $wpdb;
    $results = $wpdb->get_results( 'SELECT * FROM relacia', ARRAY_A );

    foreach ($results as $relacia) {
        wp_insert_term(
            $relacia['title'],
            'category',
            [
                'description'	=> $relacia['title'],
                'slug' 		=> sanitize_title($relacia['title'])
            ]
        );
    }
}

function insert_videa() {
    global $wpdb;

    $m = $wpdb->get_results( 'SELECT count(*) as count FROM video where duration > \'00:05:00\' and relacia_id is not null', ARRAY_A );

    $categories = $wpdb->get_results( 'SELECT * FROM wp_term_taxonomy where taxonomy = \'category\'', ARRAY_A );

    $c = [];
    foreach ($categories as $category) {
        $c[$category['description']] = $category['term_taxonomy_id'];
    }

    $max = (int)$m[0]['count'];
    $batch = 1000;

    $rounds = $max / $batch;
    for ($i=0; $i<=$rounds; $i++) {
        $start = $i * $batch;
        $limit = sprintf(' limit %d, %d', $start, $batch);
        $sql = 'SELECT v.*, (select r.title from relacia r where r.id = v.relacia_id) relaciaTitle FROM video v where v.duration > \'00:05:00\' and v.relacia_id is not null ' . $limit;
        $results = $wpdb->get_results( $sql, ARRAY_A );
        foreach ($results as $video) {
            if (isset($video['relaciaTitle']) && $video['relaciaTitle']) {
                $categoryId = (int)$c[$video['relaciaTitle']];
                $postarr = [
                    'post_title' => $video['title'],
                    'post_category' => [$categoryId],
                    'post_status' => 'publish',
                    'post_date' => $video['date'],
                    'post_content' => '<div id="flashHlsVideoPlayer"></div><script type="text/javascript">
<!--
loadStream(\'' . $video['url'] .'\', true);
//--></script>'
                ];
                wp_insert_post( $postarr);
            }
        }
    }
}

//add_action( 'after_setup_theme', 'insert_relacie' );
//add_action( 'after_setup_theme', 'insert_videa' );


/**
 * materialwp functions and definitions
 *
 * @package materialwp
 */

if ( ! function_exists( 'materialwp_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function materialwp_setup() {

	/**
	* Set the content width based on the theme's design and stylesheet.
	*/
	global $content_width;
	if ( ! isset( $content_width ) ) {
		$content_width = 640; /* pixels */
	}

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on materialwp, use a find and replace
	 * to change 'materialwp' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'materialwp', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	//Suport for WordPress 4.1+ to display titles
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'materialwp' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	// add_theme_support( 'post-formats', array(
	// 	'aside', 'image', 'video', 'quote', 'link',
	// ) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'materialwp_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // materialwp_setup
add_action( 'after_setup_theme', 'materialwp_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function materialwp_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'materialwp' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s"><div class="panel panel-warning">',
		'after_widget'  => '</div></aside>',
		'before_title'  => ' <div class="panel-heading"><h3 class="panel-title">',
		'after_title'   => '</h3></div>',
	) );
}
add_action( 'widgets_init', 'materialwp_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function materialwp_scripts() {
	wp_enqueue_style( 'mwp-bootstrap-styles', get_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css', array(), '3.3.6', 'all' );

	wp_enqueue_style( 'mwp-roboto-styles', get_template_directory_uri() . '/bower_components/bootstrap-material-design/dist/css/roboto.min.css', array(), '', 'all' );

	wp_enqueue_style( 'mwp-material-styles', get_template_directory_uri() . '/bower_components/bootstrap-material-design/dist/css/material-fullpalette.min.css', array(), '', 'all' );

	wp_enqueue_style( 'mwp-ripples-styles', get_template_directory_uri() . '/bower_components/bootstrap-material-design/dist/css/ripples.min.css', array(), '', 'all' );

	wp_enqueue_style( 'materialwp-style', get_stylesheet_uri() );

	wp_enqueue_script( 'mwp-bootstrap-js', get_template_directory_uri() . '/bower_components/bootstrap/dist/js/bootstrap.min.js', array('jquery'), '3.3.6', true );

	wp_enqueue_script( 'mwp-ripples-js', get_template_directory_uri() . '/bower_components/bootstrap-material-design/dist/js/ripples.min.js', array('jquery'), '', true );

	wp_enqueue_script( 'mwp-material-js', get_template_directory_uri() . '/bower_components/bootstrap-material-design/dist/js/material.min.js', array('jquery'), '', true );

	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', array('jquery'), '', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'materialwp_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Adds a Walker class for the Bootstrap Navbar.
 */
require get_template_directory() . '/inc/bootstrap-walker.php';

/**
 * Comments Callback.
 */
require get_template_directory() . '/inc/comments-callback.php';
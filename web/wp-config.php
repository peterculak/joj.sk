<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'streamtv_dev');

/** MySQL database username */
define('DB_USER', 'streamtv_dev');

/** MySQL database password */
define('DB_PASSWORD', 'streamtv_dev');

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'r(JXH^evr74mn`5.$.L.C/BbTm=KK`/nj&gRvIk9W7IC#C|B!YKQ![Uc(O^xv}~Y');
define('SECURE_AUTH_KEY',  '9D-:1sT:H56)^1R%,Y#aPd@XVIr@0qE|h_b!ymFT|8D:Sju|3Yr|c5rfrxE;6x!<');
define('LOGGED_IN_KEY',    'lrnSHZSq!5 9Z1n:.Z.YJ0jMrbE)L2lDwD?(U#nZJ|L7W{7pLj2=TM~E/640OnP~');
define('NONCE_KEY',        'I(5j/A4*!V*Wd5g-AM(39<sS>7g6pn8diY$N/Y+[!9E$.(=p1_scPF@ puvd4Lmx');
define('AUTH_SALT',        '&3 !:^al.5YU3<A:K}w{[.+2X{rw*W4/[^Rc%A>/1.=.ypt?zHnD=} d0NzhamP/');
define('SECURE_AUTH_SALT', 'cX#Zxyo@^/b:ZoZlq^wUAwKzOx=,:9%%2cqAZ&?voG_iIHI1(I$h*C(9h9p+%j],');
define('LOGGED_IN_SALT',   'EE}K.U#nq.n,fpyYj(Wg}[]TNxYz!cISe)ACIo qyD1]8@XlAVh`t7tXUP5--Wu2');
define('NONCE_SALT',       ' TF^Uo/,$v2HAn2!VQ17I66DcSaX-v,|+wJr*drCJ/+Fnp(qD7.i&0;|h~JPFtK&');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'website' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'I:Ti3!Bu%13u{5;NVeCkB6D$]s1?k?O!1-`5Bbu*`>=t!g9aJXpSy.AKCIy/B|M:' );
define( 'SECURE_AUTH_KEY',  '(+::sOF|%,*Lj-),Yp),Mevx(BD__7,6>jApv-I|A2s>#[xKnF;.p;n[0yGe&HjU' );
define( 'LOGGED_IN_KEY',    'k^c27!T;a[T#gXM>t&s#q_xN`dhZkmm3Fl:f*>x5*IAQ{r=%BF1ny=.BY16`>naf' );
define( 'NONCE_KEY',        '/Tozt4@H*SkzhP)$(X#/Osg/UQQb?Z@%zj_o+&vx^N{/w6wsiE<BaYC0wY@oD(F[' );
define( 'AUTH_SALT',        '6,)pfnf,<?,=S7~:PC8xQ6F?FK:*o*Vy,ic>lg-8iPfTS:7YhOHKrqv.<hy&%r+s' );
define( 'SECURE_AUTH_SALT', 's[)B46etdfa}W<dEFh*iPbT8Gj/q?$W|m/8t][=@-|BlXW1B-kK ?EJtc}9Y_:TP' );
define( 'LOGGED_IN_SALT',   'k,)tD}}#6AnYcxO;mrS$#voI5 C)jRau4nz9lQFiQHDFxB~rY?u2XJ)o{iIgZ$Kt' );
define( 'NONCE_SALT',       '{@Sxm-Jm8QJ5m52M[VU[4eW~^;>*|.ds-[r+#wi2;Wt`iZI|_,gmB,pf4vwtP*k>' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

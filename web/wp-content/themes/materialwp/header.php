<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="joj">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">


<base href="/">
<link rel="shortcut icon" href="/images/logo.svg">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.css">

<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" type="text/javascript"></script>

<!--<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>-->
<!--<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>-->
<!--<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>-->
<!--<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>-->

<!-- Angular Material Library -->
<!--<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>-->
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.js"></script>-->
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/restangular/1.4.0/restangular.min.js"></script>-->
<!--<script type="text/javascript" src="//cdn.jsdelivr.net/lodash/2.1.0/lodash.compat.min.js"></script>-->
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angulartics-google-analytics/0.1.4/angulartics-google-analytics.min.js"></script>-->
<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angulartics/1.0.3/angulartics.min.js"></script>-->


<?php wp_head(); ?>

<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/themeOverrides.css?v=1.1" type="text/css" media="screen" />
<!--<link rel="stylesheet" href="/scripts/dist/styles/main.css" type="text/css" media="screen" />--> <!-- angular styles-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>


<?php //require_once(__DIR__ . '/../../../app.html'); ?> <!-- this loads angular -->
<script src="/scripts/loadPlayer.js" type="text/javascript"></script>
<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-74974547-1', 'streamtv.sk');
	ga('set', 'anonymizeIp', false);
	ga('send', 'pageview');
</script>
</head>

<body layout="column" ui-view <?php body_class(); ?> ng-controller="HomeCtrl as ctrl">


<div id="page" class="hfeed site">

	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'materialwp' ); ?></a>

	<header id="masthead" class="site-header" role="banner">

		<nav class="navbar navbar-inverse" role="navigation">

		  <div class="container">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header" >

				<a target="_parent" class="navbar-brand" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>">StreamTV</a>
    		</div>

        	</div><!-- /.container -->
		</nav><!-- .navbar .navbar-default -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
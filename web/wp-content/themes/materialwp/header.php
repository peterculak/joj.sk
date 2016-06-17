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


<script src="/scripts/vxgplayer-1.7.41.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" type="text/javascript"></script>

<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>

<!-- Angular Material Library -->
<script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.18/angular-ui-router.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/restangular/1.4.0/restangular.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/lodash/2.1.0/lodash.compat.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angulartics-google-analytics/0.1.4/angulartics-google-analytics.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angulartics/1.0.3/angulartics.min.js"></script>


<?php wp_head(); ?>

<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/themeOverrides.css?v=1" type="text/css" media="screen" />
<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/streamtv.css" type="text/css" media="screen" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>

<!--<script src="scripts/app-ecc14a0b.js"></script>-->
<?php require_once(__DIR__ . '/../../../app.html'); ?>

</head>

<body layout="column" ui-view <?php body_class(); ?> ng-controller="HomeCtrl as ctrl">
	<md-sidenav
		layout="column" class="md-sidenav-left md-whiteframe-z2"
		md-component-id="left"
		md-disable-backdrop
		md-whiteframe="4">
		<md-tabs md-selected="selectedIndex" md-theme="light-blue" md-dynamic-height md-border-bottom>
			<md-tab label="tv stanice">
				<md-content layout-padding>
					<div layout="column">
						<md-list>
							<md-list-item><md-button ng-class="{'md-raised md-primary' : ctrl.channel === 'ta' }" flex ng-click="ctrl.ta3Live()">TA3</md-button> </md-list-item>
							<md-list-item ng-repeat="playlistItem in ctrl.playlist.vgx">
								<md-button ng-class="{'md-raised md-primary' : ctrl.channel === playlistItem.u }" flex ng-click="ctrl.playVgx(playlistItem.n)">{{ctrl.base64decode(playlistItem.n)}}</md-button>
							</md-list-item>
						</md-list>
					</div>
				</md-content>
			</md-tab>

			<md-tab label="markíza archív">
				<md-content layout-padding>
					<div layout="column">
						<md-list ng-show="!showMarkizaEpizodes">
							<md-list-item ng-repeat="item in archive['markiza']">
								<md-button title="{{item.title}}" flex ng-click="fetchMarkizaEpizodes(item)">{{item.title}}</md-button>
							</md-list-item>
						</md-list>

						<md-button ng-click="showMarkizaEpizodes = 0" ng-show="showMarkizaEpizodes" aria-label="Späť">
							<md-icon> arrow_back </md-icon>
						</md-button>
						<md-list ng-show="showMarkizaEpizodes">
							<md-list-item ng-repeat="epizode in archive['markiza'].epizodes">
								<md-button title="{{epizode.title}} ({{epizode.date}})" ng-class="{'md-raised md-primary' : ctrl.epizode.title + ctrl.epizode.date === epizode.title + epizode.date }" flex ng-click="ctrl.playMarkizaArchiveItem(epizode)">{{epizode.title}} ({{epizode.date}})</md-button>
							</md-list-item>
						</md-list>
						<md-progress-linear ng-show="markizaService.fetchingEpizodes" md-mode="indeterminate"></md-progress-linear>
					</div>
				</md-content>
			</md-tab>

			<md-tab label="joj archív">
				<md-content layout-padding>
					<div layout="column">
						<md-list ng-show="!showJojEpizodes">
							<md-list-item ng-repeat="item in archive['joj']">
								<md-button flex ng-click="fetchJojEpizodes(item)">{{item.title}}</md-button>
							</md-list-item>
						</md-list>

						<md-button ng-click="showJojEpizodes = 0" ng-show="showJojEpizodes" aria-label="Späť">
							<md-icon> arrow_back </md-icon>
						</md-button>
						<md-list ng-show="showJojEpizodes">
							<md-list-item ng-repeat="epizode in archive['joj'].epizodes">
								<md-button title="{{epizode.title}} ({{epizode.date}})" ng-class="{'md-raised md-primary' : ctrl.epizode.title + ctrl.epizode.date === epizode.title + epizode.date }" flex ng-click="ctrl.playJojArchiveItem(epizode)">{{epizode.title}} ({{epizode.date}})</md-button>
							</md-list-item>
						</md-list>
						<md-progress-linear ng-show="jojService.fetchingEpizodes || jojPlusService.fetchingEpizodes || wauService.fetchingEpizodes" md-mode="indeterminate"></md-progress-linear>
					</div>
				</md-content>
			</md-tab>

			<md-tab label="joj+ archív">
				<md-content layout-padding>
					<div layout="column">
						<md-list ng-show="!showJojPlusEpizodes">
							<md-list-item ng-repeat="item in archive['jojplus']">
								<md-button flex ng-click="fetchJojPlusEpizodes(item)">{{item.title}}</md-button>
							</md-list-item>
						</md-list>

						<md-button ng-click="showJojPlusEpizodes = 0" ng-show="showJojPlusEpizodes" aria-label="Späť">
							<md-icon> arrow_back </md-icon>
						</md-button>
						<md-list ng-show="showJojPlusEpizodes">
							<md-list-item ng-repeat="epizode in archive['jojplus'].epizodes">
								<md-button title="{{epizode.title}} ({{epizode.date}})" ng-class="{'md-raised md-primary' : ctrl.epizode.title + ctrl.epizode.date === epizode.title + epizode.date }" flex ng-click="ctrl.playJojPlusArchiveItem(epizode)">{{epizode.title}} ({{epizode.date}})</md-button>
							</md-list-item>
						</md-list>
						<md-progress-linear ng-show="jojService.fetchingEpizodes" md-mode="indeterminate"></md-progress-linear>
					</div>
				</md-content>
			</md-tab>

			<md-tab label="wau archív">
				<md-content layout-padding>
					<div layout="column">
						<md-list ng-show="!showWauEpizodes">
							<md-list-item ng-repeat="item in archive['wau']">
								<md-button flex ng-click="fetchWauEpizodes(item)">{{item.title}}</md-button>
							</md-list-item>
						</md-list>

						<md-button ng-click="showWauEpizodes = 0" ng-show="showWauEpizodes" aria-label="Späť">
							<md-icon> arrow_back </md-icon>
						</md-button>
						<md-list ng-show="showWauEpizodes">
							<md-list-item ng-repeat="epizode in archive['wau'].epizodes">
								<md-button title="{{epizode.title}} ({{epizode.date}})" ng-class="{'md-raised md-primary' : ctrl.epizode.title + ctrl.epizode.date === epizode.title + epizode.date }" flex ng-click="ctrl.playWauArchiveItem(epizode)">{{epizode.title}} ({{epizode.date}})</md-button>
							</md-list-item>
						</md-list>
						<md-progress-linear ng-show="jojService.fetchingEpizodes" md-mode="indeterminate"></md-progress-linear>
					</div>
				</md-content>
			</md-tab>
		</md-tabs>

	</md-sidenav>

<div id="page" class="hfeed site">

	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'materialwp' ); ?></a>

	<header id="masthead" class="site-header" role="banner">

		<nav class="navbar navbar-inverse" role="navigation">

		  <div class="container">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header" >

				<md-button ng-click="toggleLeft()" class="md-icon-button">
					<md-icon>menu</md-icon>
				</md-button>

				<a target="_parent" class="navbar-brand" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>">StreamTV</a>
    		</div>

        	</div><!-- /.container -->
		</nav><!-- .navbar .navbar-default -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">

  <md-button ng-click="share()" id="mb_button--share" aria-label="Zdieľať" class="md-fab" >
    <md-icon> share </md-icon>
  </md-button>

  <md-button ng-show="player.playing" ng-click="player.reset()" id="mb_button--back" aria-label="Naspäť" class="md-fab md-primary" >
    <md-icon> arrow_back </md-icon>
  </md-button>

  <md-progress-circular ng-show="ctrl.loading || jojService.fetchingStreams || markizaService.fetchingStreams" class="progress-player" md-mode="indeterminate"></md-progress-circular>


  <md-grid-list ng-show="showWhatsOn && !player.playing && !jojService.fetchingStreams && !markizaService.fetchingStreams"
                md-cols-xs="1" md-cols-sm="2" md-cols-md="4" md-cols-gt-md="6"
                md-row-height-gt-md="2:1" md-row-height="3:1"
                md-gutter="4px">
    <md-grid-tile ng-click="ctrl.playMarkizaArchiveItem(epizode)" ng-repeat="epizode in whatson['markiza']" class="gray repeated-item"
                  md-rowspan="2" md-rowspan-gt-md="3" md-colspan="1" md-colspan-gt-md="2" md-colspan-sm="1" ng-style="{'background-image':'url({{epizode.image}})'}">
      <md-icon layout="row" class="play"> play_circle_outline </md-icon>
      <md-grid-tile-footer>
        <h3>{{epizode.title}}</h3>
      </md-grid-tile-footer>
    </md-grid-tile>

    <md-grid-tile ng-click="ctrl.playJojArchiveItem(epizode)" ng-repeat="epizode in whatson['joj']" class="gray repeated-item"
                  md-rowspan="1" md-colspan="1" md-colspan-sm="1" ng-style="{'background-image':'url({{epizode.image}})'}">
      <md-icon class="play play--small"> play_circle_outline </md-icon>
      <md-grid-tile-footer>
        <h3>{{epizode.title}} - {{epizode.type}}</h3>
      </md-grid-tile-footer>
    </md-grid-tile>

    <md-grid-tile ng-click="ctrl.playJojPlusArchiveItem(epizode)" ng-repeat="epizode in whatson['jojplus']" class="gray repeated-item"
                  md-rowspan="1" md-colspan="1" md-colspan-sm="1" ng-style="{'background-image':'url({{epizode.image}})'}">
      <md-icon class="play play--small"> play_circle_outline </md-icon>
      <md-grid-tile-footer>
        <h3>{{epizode.title}} - {{epizode.type}}</h3>
      </md-grid-tile-footer>
    </md-grid-tile>

    <md-grid-tile ng-click="ctrl.playWauArchiveItem(epizode)" ng-repeat="epizode in whatson['wau']" class="gray repeated-item"
                  md-rowspan="1" md-colspan="1" md-colspan-sm="1" ng-style="{'background-image':'url({{epizode.image}})'}">
      <md-icon class="play play--small"> play_circle_outline </md-icon>
      <md-grid-tile-footer>
        <h3>{{epizode.title}} - {{epizode.type}}</h3>
      </md-grid-tile-footer>
    </md-grid-tile>


  </md-grid-list>

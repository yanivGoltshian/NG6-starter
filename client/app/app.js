import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-ui-bootstrap/dist/ui-bootstrap';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

angular.module('app', [
    uiRouter,
    Common,
    Components,
    'ui.bootstrap'
  ])
  .config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);

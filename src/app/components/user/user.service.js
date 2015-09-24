/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

(function () {
  'use strict';

  angular.module('janusHangouts')
    .service('UserService', UserService);

  UserService.$inject = ['$q', '$state', '$rootScope', 'RemoteLoggingService'];

  function UserService($q, $state, $rootScope, RemoteLoggingService) {
    this.user = null;

    this.signin = function (username) {
      var d = $q.defer();
      this.user = { username: username };
      RemoteLoggingService.setSource(username);
      RemoteLoggingService.info("logged in");
      d.resolve(this.user);
      return d.promise;
    };

    this.currentUser = function() {
      var d = $q.defer();
      if (this.user !== null) {
        $rootScope.$broadcast('user.set', this.user);
        d.resolve(this.user);
      } else {
        d.reject('Not signed in');
      }
      return d.promise;
    };

    this.signout = function() {
      var d = $q.defer();
      this.user = null;
      d.resolve();
      $rootScope.$broadcast('user.unset');
      $state.go('signin');
      return d.promise;
    };
  }
})();

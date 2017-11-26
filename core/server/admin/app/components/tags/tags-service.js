angular.module('Leaf')

.factory('tagsService',['$rootScope','$http',function($rootScope,$http) {

  return {

    // Return the API URL.
    apiUrl : function() {
      return $rootScope.siteUrl + '/api/tags';
    },

    // Get all tags.
    find : function() {
      return $http.get(this.apiUrl()).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Get a tag.
    get : function(id) {
      return $http.get(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Insert a tag.
    create : function(tag) {
      return $http.post(this.apiUrl(),tag).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Update a tag.
    update : function(tag) {
      return $http.put(this.apiUrl(),tag).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Delete a tag.
    remove : function(id) {
      return $http.delete(this.apiUrl() + '/' + id).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    },

    // Get the slug based on tag name.
    slugify : function(name) {
      return $http.post($rootScope.siteUrl + '/api/misc/slug',{s : name}).then(function(res) {
        return res;
      },
      function(err) {
        return err;
      });
    }

  };

}]);
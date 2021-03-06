app.factory('Utils', function(){
	return{
		isSmallDevice: function(){
			var isSmallDevice = false;
			if($(window).width() < 800){
			    isSmallDevice=true;
			} else{
			    isSmallDevice=false;
			};
			$(window).resize(function(){
			    if($(window).width() < 800){
			        isSmallDevice=true;
			    } else{
			        isSmallDevice=false;
			    };
			});
			return isSmallDevice;
		},
		toSlug: function(str){
			str = str.replace(/^\s+|\s+$/g, ''); // trim
			str = str.toLowerCase();

			// remove accents, swap ñ for n, etc
			var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
			var to   = "aaaaeeeeiiiioooouuuunc------";
			for (var i=0, l=from.length ; i<l ; i++) {
				str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
			}

			str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
				.replace(/\s+/g, '-') // collapse whitespace and replace by -
				.replace(/-+/g, '-'); // collapse dashes

			return str;
		},
		duplicates: function(arr){
			var n, y, x, i, r;
			var arrResult = {},
				unique = [];
			for (i = 0, n = arr.length; i < n; i++) {
				var item = arr[i];
				arrResult[item._id] = item;
			}
			i = 0;
			for (var item in arrResult) {
				unique[i++] = arrResult[item];
			}
			return unique;
		}
	}
});

//ORDER OBJECT BY
app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

app.service('Download', function ($http) {
  return {
		dl : function(data) {
			return $http.post('/download', data);
		}
	}
})


// app.factory('mood', ['$http' ,function($http) {
// 	return {
// 		get : function() {
// 			return $http.get('/api/moods');
// 		},
// 		getId : function(id) {
// 			return $http.get('/api/moods/' + id);
// 		},
// 		getName : function(slug) {
// 			return $http.get('/api/moods/name/' + slug);
// 		},
// 		create : function(moodData) {
// 			return $http.post('/api/moods', moodData);
// 		},
// 		update : function(moodData, id) {
// 			return $http.put('/api/moods/' + id, moodData);
// 		},
// 		delete : function(id) {
// 			return $http.delete('/api/moods/' + id);
// 		}
// 	}
// }]);

